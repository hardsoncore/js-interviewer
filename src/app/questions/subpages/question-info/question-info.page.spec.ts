import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { BehaviorSubject, of, throwError } from 'rxjs';

import { StaticTranslateLoader } from 'src/app/i18n/static-translate.loader';
import { Languages } from 'src/app/enums/app.enum';

import { QuestionInfoPage } from './question-info.page';
import { QuestionsService } from 'src/app/services/questions.service';
import { ResultsService } from 'src/app/services/results.service';
import { StreakService } from 'src/app/services/streak.service';
import { QueryParams } from 'src/app/models/app.model';
import { Question } from 'src/app/models/question.model';
import { QuestionCategories, QuestionLevels } from 'src/app/enums/questions.enum';

function makeQuestion(id: number): Question {
  return {
    id,
    name: `Question ${id}`,
    answer: `answers/${id}.md`,
    level: QuestionLevels.junior,
    tags: ['tag'],
    category: QuestionCategories.javascript,
    structure: [],
  };
}

describe('QuestionInfoPage', () => {
  let component: QuestionInfoPage;
  let fixture: ComponentFixture<QuestionInfoPage>;

  let routerMock: { navigate: jasmine.Spy };
  let questionsServiceMock: { questions: BehaviorSubject<Question[]> };
  let resultsServiceMock: { setResult: jasmine.Spy };
  let streakServiceMock: { recordActivity: jasmine.Spy };
  let httpMock: { get: jasmine.Spy };
  let queryParams$: BehaviorSubject<QueryParams>;

  const questions = [makeQuestion(1), makeQuestion(2), makeQuestion(3)];

  beforeEach(waitForAsync(() => {
    queryParams$ = new BehaviorSubject<QueryParams>({ questionId: 2 });
    routerMock = { navigate: jasmine.createSpy('navigate') };
    questionsServiceMock = { questions: new BehaviorSubject<Question[]>(questions) };
    resultsServiceMock = { setResult: jasmine.createSpy('setResult') };
    streakServiceMock = { recordActivity: jasmine.createSpy('recordActivity') };
    httpMock = { get: jasmine.createSpy('get').and.returnValue(of('# Answer content')) };

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), QuestionInfoPage],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: { queryParams: queryParams$ } },
        { provide: QuestionsService, useValue: questionsServiceMock },
        { provide: ResultsService, useValue: resultsServiceMock },
        { provide: StreakService, useValue: streakServiceMock },
        { provide: HttpClient, useValue: httpMock },
        provideTranslateService({ loader: provideTranslateLoader(StaticTranslateLoader), fallbackLang: Languages.eng, lang: Languages.eng }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionInfoPage);
    component = fixture.componentInstance;
  }));

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should resolve the question from the query param and load its answer', () => {
      component.ngOnInit();

      expect(component.questionId).toBe(2);
      expect(component.question.id).toBe(2);
      expect(httpMock.get).toHaveBeenCalledWith('answers/2.md', { responseType: 'text' });
      expect(component.question.answer).toBe('# Answer content');
    });

    it('should set redirectedFromQuiz when the fromQuiz param is present', () => {
      queryParams$.next({ questionId: 2, fromQuiz: true } as QueryParams);
      component.ngOnInit();

      expect(component.redirectedFromQuiz).toBeTrue();
    });

    it('should render a fallback message when the answer fails to load', () => {
      httpMock.get.and.returnValue(throwError(() => new Error('404')));
      spyOn(console, 'error');

      component.ngOnInit();

      expect(component.question.answer).toContain('404 - Answer Text Not Found');
    });
  });

  describe('markAsComplete', () => {
    beforeEach(() => component.ngOnInit());

    function checkedEvent(checked: boolean): CustomEvent {
      return { detail: { checked } } as CustomEvent;
    }

    it('should record the result and streak when checked', () => {
      component.markAsComplete(checkedEvent(true));

      expect(resultsServiceMock.setResult).toHaveBeenCalledWith({ id: 2, correctness: 100 });
      expect(streakServiceMock.recordActivity).toHaveBeenCalled();
    });

    it('should do nothing when not checked', () => {
      component.markAsComplete(checkedEvent(false));

      expect(resultsServiceMock.setResult).not.toHaveBeenCalled();
      expect(streakServiceMock.recordActivity).not.toHaveBeenCalled();
    });

    it('should return to the quiz after completing when redirected from quiz', fakeAsync(() => {
      queryParams$.next({ questionId: 2, fromQuiz: true } as QueryParams);
      component.ngOnInit();

      component.markAsComplete(checkedEvent(true));
      tick(100);

      expect(routerMock.navigate).toHaveBeenCalledWith(
        ['tabs/quiz'],
        jasmine.objectContaining({ queryParams: { needToUpdate: true } })
      );
    }));
  });

  describe('navigation', () => {
    beforeEach(() => component.ngOnInit());

    it('backToQuiz should navigate to the quiz with needToUpdate', () => {
      component.backToQuiz();

      expect(routerMock.navigate).toHaveBeenCalledWith(
        ['tabs/quiz'],
        jasmine.objectContaining({ queryParams: { needToUpdate: true } })
      );
    });

    it('goToNextQuestion should navigate to the following question', () => {
      component.goToNextQuestion();

      expect(routerMock.navigate).toHaveBeenCalledWith(
        ['tabs/questions/question-info'],
        jasmine.objectContaining({ queryParams: { questionId: 3 } })
      );
    });

    it('goToPrevQuestion should navigate to the previous question', () => {
      component.goToPrevQuestion();

      expect(routerMock.navigate).toHaveBeenCalledWith(
        ['tabs/questions/question-info'],
        jasmine.objectContaining({ queryParams: { questionId: 1 } })
      );
    });
  });

  describe('boundary helpers', () => {
    function initWith(questionId: number) {
      queryParams$.next({ questionId });
      component.ngOnInit();
    }

    it('isFirstQuestion should be true for the first question', () => {
      initWith(1);
      expect(component.isFirstQuestion()).toBeTrue();
      expect(component.isLastQuestion()).toBeFalse();
    });

    it('isLastQuestion should be true for the last question', () => {
      initWith(3);
      expect(component.isLastQuestion()).toBeTrue();
      expect(component.isFirstQuestion()).toBeFalse();
    });

    it('should report neither first nor last for a middle question', () => {
      initWith(2);
      expect(component.isFirstQuestion()).toBeFalse();
      expect(component.isLastQuestion()).toBeFalse();
    });

    it('goToPrevQuestion should do nothing on the first question', () => {
      initWith(1);
      component.goToPrevQuestion();
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('goToNextQuestion should do nothing on the last question', () => {
      initWith(3);
      component.goToNextQuestion();
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete without throwing', () => {
      component.ngOnInit();
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });
});
