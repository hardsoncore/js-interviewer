import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { Question } from 'src/app/models/question.model';
import { QuestionsService } from 'src/app/services/questions.service';
import { QueryParams } from 'src/app/models/app.model';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-question-info',
  templateUrl: './question-info.page.html',
  styleUrls: ['./question-info.page.scss'],
})
export class QuestionInfoPage implements OnInit, OnDestroy {
  questionId: number;
  question: Question;
  redirectedFromQuiz = false;
  isQuestionCompleted = false;

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionsService: QuestionsService,
    private http: HttpClient,
    private resultsService: ResultsService,
  ) { }

  ngOnInit() {
    // subscribe to both query params and questions list, so we can react to changes in either of them
    combineLatest([
      this.route.queryParams,
      this.questionsService.questions
    ]).pipe(
      takeUntil(this.destroy$), // unsubscribe when component is destroyed
      map(([params, _]) => {
        this.questionId = +params.questionId;
        return this.questionsService.getQuestionById(this.questionId);
      }),
      filter(question => !!question), // skip if question not found
      // distinctUntilChanged is needed to prevent reloading the answer content if the same question is emitted again
      distinctUntilChanged((prev, curr) => prev.id === curr.id)
    ).subscribe((question) => {
      this.question = question;
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
    this.resultsService.recordActivity();

    if (this.redirectedFromQuiz) {
      setTimeout(() => {
        this.isQuestionCompleted = false;
        this.backToQuiz();
      }, 100);
    }
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
    const prevQuestionId = this.questionId - 1;
    if (prevQuestionId < 1) return; // prevent navigating to non-existent question

    const navigationExtras: NavigationExtras = {
      queryParams: {
        questionId: prevQuestionId,
      } as QueryParams
    };

    this.router.navigate(['tabs/questions/question-info'], navigationExtras);
  }

  public goToNextQuestion(): void {
    const nextQuestionId = this.questionId + 1;
    if (nextQuestionId > this.questionsService.getQuestionsCount()) return; // prevent navigating to non-existent question

    const navigationExtras: NavigationExtras = {
      queryParams: {
        questionId: nextQuestionId,
      } as QueryParams
    };

    this.router.navigate(['tabs/questions/question-info'], navigationExtras);
  }

  public isFirstQuestion(): boolean {
    return this.questionId === 1;
  }

  public isLastQuestion(): boolean {
    return this.questionId >= this.questionsService.getQuestionsCount();
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
                Help us fill the gap — we\'d love your contribution via a
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
