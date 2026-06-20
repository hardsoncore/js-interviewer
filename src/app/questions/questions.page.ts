import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

import { QuestionsService } from 'src/app/services/questions.service';
import { Question, Results } from 'src/app/models/question.model';
import { QueryParams } from 'src/app/models/app.model';
import { ResultsService } from 'src/app/services/results.service';
import { QuestionLevels } from 'src/app/enums/questions.enum';
@Component({
    selector: 'app-questions',
    templateUrl: 'questions.page.html',
    styleUrls: ['questions.page.scss'],
    standalone: false
})
export class QuestionsPage implements OnInit, OnDestroy {
  questions: Question[] = [];
  filteredQuestions: Question[] = [];
  results: Results[];
  questionLevels = QuestionLevels;

  private destroy$ = new Subject<void>();

  constructor(
    private questionsService: QuestionsService,
    private router: Router,
    private resultsService: ResultsService,
  ) { }

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

  public handleInput(event: any) {
    const query = event.target.value?.toLowerCase() || '';

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
