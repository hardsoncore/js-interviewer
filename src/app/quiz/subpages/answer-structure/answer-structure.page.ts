import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/models/question.model';
import { QueryParams } from 'src/app/models/app.model';
import { ResultsService } from 'src/app/services/results.service';
import { StreakService } from 'src/app/services/streak.service';

@Component({
    selector: 'app-answer-structure',
    templateUrl: './answer-structure.page.html',
    styleUrls: ['./answer-structure.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AnswerStructurePage implements OnInit, OnDestroy {
  questionId: number;
  question: Question;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService,
    private resultsService: ResultsService,
    private streakService: StreakService,
  ) { }

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: QueryParams) => {
      this.questionId = +params.questionId;

      this._initQuestion();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public backToQuiz(useParams = false): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        needToUpdate: true
      } as QueryParams
    };

    this.router.navigate(['tabs/quiz'], useParams && navigationExtras);
  }

  public saveResult(): void {
    const correctness = this._calculateCorrectness();

    this.resultsService.setResult({ id: this.question.id, correctness });
    this.streakService.recordActivity();
    this.backToQuiz(true);
  }

  private _initQuestion(): void {
    this.questionsService.questions.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.question = this.questionsService.getQuestionById(this.questionId);
    });
  }

  private _calculateCorrectness(): number {
    let correctAnswers = 0;

    if (!this.question?.structure || this.question.structure.length === 0) {
      return 0;
    }

    this.question.structure.forEach(step => step.isChecked && correctAnswers++);

    return Math.round(correctAnswers / this.question.structure.length * 100);
  }
}
