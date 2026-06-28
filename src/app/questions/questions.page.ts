import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

import { QuestionsService } from 'src/app/services/questions.service';
import { Question, Results } from 'src/app/models/question.model';
import { QueryParams } from 'src/app/models/app.model';
import { ResultsService } from 'src/app/services/results.service';
import { QuestionLevels } from 'src/app/enums/questions.enum';
import { IonicModule } from '@ionic/angular';
import { AsyncPipe } from '@angular/common';
@Component({
    selector: 'app-questions',
    templateUrl: 'questions.page.html',
    styleUrls: ['questions.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonicModule, AsyncPipe]
})
export class QuestionsPage implements OnInit, OnDestroy {
  private questionsService = inject(QuestionsService);
  private router = inject(Router);
  private resultsService = inject(ResultsService);

  questions: Question[] = [];
  filteredQuestions: Question[] = [];
  results: Results[];
  questionLevels = QuestionLevels;

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.questionsService.questions.pipe(takeUntil(this.destroy$)).subscribe(questions => {
      this.questions = questions;
      this.filteredQuestions = questions;
    });
    this.resultsService.results.pipe(takeUntil(this.destroy$)).subscribe(results => this.results = results);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handleInput(event: Event) {
    const target = event.target as HTMLInputElement | null;
    const query = target?.value?.toLowerCase() || '';

    if (!query.trim()) {
      this.filteredQuestions = [...this.questions];
      return;
    }

    this.filteredQuestions = this.questions.filter((question: Question) => {
      const matchTags = question.tags?.some(tag => tag.toLowerCase().includes(query));
      const matchCategory = question.category?.toLowerCase().includes(query);
      const matchName = question.name?.toLowerCase().includes(query);
      const matchId = question.id?.toString().includes(query);

      return matchTags || matchCategory || matchName || matchId;
    });
  }

  public trackById(index: number, item: Question) {
    return item.id;
  }

  public getPercentById(id: number): Observable<number> {
    return this.resultsService.getPercentById(id);
  }

  public clickOnQuestion(question: Question): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        questionId: question.id,
      } as QueryParams
    };

    this.router.navigate(['tabs/questions/question-info'], navigationExtras);
  }
}
