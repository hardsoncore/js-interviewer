import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { QueryParams } from '../models/app.model';
import { Question } from '../models/question.model';
import { QuestionsService } from '../services/questions.service';
import { ResultsService } from '../services/results.service';
import { QuestionLevels } from '../enums/questions.enum';
import { IonicModule } from '@ionic/angular';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-quiz',
    templateUrl: 'quiz.page.html',
    styleUrls: ['quiz.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonicModule, AsyncPipe, TranslatePipe]
})
export class QuizPage implements OnInit, OnDestroy {
  private questionsService = inject(QuestionsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private resultsService = inject(ResultsService);

  questionLevels = QuestionLevels;
  question: Question | null = null;
  percent$: Observable<number> | null = null;
  isRandomized = JSON.parse(localStorage.getItem('isRandomized') || 'false');

  private destroy$ = new Subject<void>();
  private timerId?: ReturnType<typeof setTimeout>;

  get levelColor(): string {
    switch (this.question?.level) {
      case QuestionLevels.junior:
        return 'success';
      case QuestionLevels.middle:
        return 'warning';
      default:
        return 'danger';
    }
  }

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: QueryParams) => {
      if (params.needToUpdate) {
        this.getNextQuestion();
        this._clearQueryParams();
      }
    });

    this.getNextQuestion();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  public visitTheoryPage(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        questionId: this.question?.id,
        fromQuiz: true,
      } as QueryParams
    };

    this.router.navigate(['tabs/questions/question-info'], navigationExtras);
  }

  public submitAnswer(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        questionId: this.question?.id,
      } as QueryParams
    };

    this.router.navigate(['tabs/quiz/answer-structure'], navigationExtras);
  }

  public toggleRandom(): void {
    this.isRandomized = !this.isRandomized;
    localStorage.setItem('isRandomized', JSON.stringify(this.isRandomized));

    this.getNextQuestion();
  }

  public getNextQuestion(): void {
    this.question = null;

    // with timeout looks better
    this.timerId = setTimeout(() => {
      this.resultsService.results.pipe(take(1)).subscribe(results => {
        const uncompletedQuestions = results.filter(r => r.correctness < 100);

        if (uncompletedQuestions.length > 0) {
          let selectedId: number | string;

          if (this.isRandomized) {
            selectedId = uncompletedQuestions[Math.floor(Math.random() * uncompletedQuestions.length)].id;
          } else {
            selectedId = uncompletedQuestions[0].id;
          }

          this.question = this.questionsService.getQuestionById(selectedId);
          this.percent$ = this.resultsService.getPercentById(this.question?.id);
        } else {
          this.questionsService.getRandomQuestion().pipe(take(1)).subscribe(q => {
            this.question = q;
            this.percent$ = this.resultsService.getPercentById(this.question?.id);
          });
        }
      });
    }, 1000);
  }

  private _clearQueryParams(): void {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: {} });
  }
}
