import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { Question } from 'src/app/models/question.model';
import { QuestionLevels } from 'src/app/enums/questions.enum';
import { Colors } from 'src/app/enums/app.enum';
import { QuestionsService } from 'src/app/services/questions.service';
import { QueryParams } from 'src/app/models/app.model';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { ResultsService } from 'src/app/services/results.service';
import { StreakService } from 'src/app/services/streak.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { answersMeta } from 'answers-meta';

@Component({
    selector: 'app-question-info',
    templateUrl: './question-info.page.html',
    styleUrls: ['./question-info.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonicModule, FormsModule]
})
export class QuestionInfoPage implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private questionsService = inject(QuestionsService);
  private http = inject(HttpClient);
  private resultsService = inject(ResultsService);
  private streakService = inject(StreakService);

  questionId: number;
  question: Question;
  redirectedFromQuiz = false;
  isQuestionCompleted = false;
  lastUpdated: string | null = null;

  private questions: Question[] = [];
  private destroy$ = new Subject<void>();

  ngOnInit() {
    // subscribe to both query params and questions list, so we can react to changes in either of them
    combineLatest([
      this.route.queryParams,
      this.questionsService.questions
    ]).pipe(
      takeUntil(this.destroy$), // unsubscribe when component is destroyed
      map(([params, questions]) => {
        this.questions = questions;
        this.questionId = Number(params.questionId);
        return questions.find(q => Number(q.id) === this.questionId) ?? null;
      }),
      filter((question): question is Question => !!question), // skip if question not found
      // distinctUntilChanged is needed to prevent reloading the answer content if the same question is emitted again
      distinctUntilChanged((prev, curr) => prev.id === curr.id)
    ).subscribe((question) => {
      this.isQuestionCompleted = false;
      this.question = question;

      // read the date before loadAnswerContent overwrites question.answer with the content
      this.lastUpdated = answersMeta[question.answer] || null;
      this.loadAnswerContent(this.question.answer); // TODO: ideally, need not to rewrite the field, but to have a separate one for content
    });

    this.route.queryParams.pipe(
      takeUntil(this.destroy$),
      map(params => !!params.fromQuiz)
    ).subscribe(fromQuiz => this.redirectedFromQuiz = fromQuiz);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public markAsComplete(event: CustomEvent): void {
    if (!event.detail.checked) {
      return;
    }

    this.resultsService.setResult({ id: this.question.id, correctness: 100 });
    this.streakService.recordActivity();

    if (this.redirectedFromQuiz) {
      setTimeout(() => {
        this.isQuestionCompleted = false;
        this.backToQuiz();
      }, 100);
    }
  }

  public levelColor(level: QuestionLevels): Colors {
    if (level === QuestionLevels.junior) return Colors.success;
    if (level === QuestionLevels.middle) return Colors.warning;
    return Colors.danger;
  }

  public backToQuiz(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        needToUpdate: true
      } as QueryParams
    };

    this.router.navigate(['tabs/quiz'], navigationExtras);
  }

  public goToPrevQuestion(): void {
    this._navigateByOffset(-1);
  }

  public goToNextQuestion(): void {
    this._navigateByOffset(1);
  }

  public isFirstQuestion(): boolean {
    // -1 (not found) also disables the button — safe fallback
    return this._getCurrentIndex() <= 0;
  }

  public isLastQuestion(): boolean {
    const index = this._getCurrentIndex();
    return index === -1 || index >= this.questions.length - 1;
  }

  private _getCurrentIndex(): number {
    return this.questions.findIndex(q => Number(q.id) === Number(this.questionId));
  }

  private _navigateByOffset(offset: number): void {
    const target = this.questions[this._getCurrentIndex() + offset];
    if (!target) return; // out of bounds — do nothing

    const navigationExtras: NavigationExtras = {
      queryParams: {
        questionId: target.id,
      } as QueryParams
    };

    this.router.navigate(['tabs/questions/question-info'], navigationExtras);
  }

  private loadAnswerContent(path: string) {
    this.http.get(path, { responseType: 'text' }).subscribe({
      next: (content) => {
        this.question = {
          ...this.question,
          answer: content,
        };
      },
      error: (err) => {
        console.error('Failed to load answer content', err);
        this.question = {
          ...this.question,
          answer: `
            <section class="load-answer-error">
              <p class="load-answer-error__emoji">💔</p>
              <h3 class="load-answer-error__title">404 - Answer Text Not Found</h3>
              <p class="load-answer-error__text">
                Help us fill the gap — we'd love your contribution via a
                <a class="load-answer-error__link" href="https://github.com/hardsoncore/js-interviewer/pulls" target="_blank">
                  Pull Request on GitHub
                </a>
              </p>
            </section>
          `,
        };
      }
    });
  }
}
