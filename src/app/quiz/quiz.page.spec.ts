import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

import { QuizPage } from './quiz.page';
import { QuestionsService } from '../services/questions.service';
import { ResultsService } from '../services/results.service';
import { QueryParams } from '../models/app.model';
import { Question, Results } from '../models/question.model';
import { QuestionCategories, QuestionLevels } from '../enums/questions.enum';

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

describe('QuizPage', () => {
  let component: QuizPage;
  let fixture: ComponentFixture<QuizPage>;

  let questionsServiceMock: { getQuestionById: jasmine.Spy; getRandomQuestion: jasmine.Spy };
  let resultsServiceMock: { results: BehaviorSubject<Results[]>; getPercentById: jasmine.Spy };
  let routerMock: { navigate: jasmine.Spy };
  let queryParams$: BehaviorSubject<QueryParams>;

  const q1 = makeQuestion(1);
  const q2 = makeQuestion(2);
  const randomQuestion = makeQuestion(99);

  beforeEach(waitForAsync(() => {
    localStorage.clear();
    queryParams$ = new BehaviorSubject<QueryParams>({});

    questionsServiceMock = {
      getQuestionById: jasmine.createSpy('getQuestionById').and.callFake((id: number) => makeQuestion(Number(id))),
      getRandomQuestion: jasmine.createSpy('getRandomQuestion').and.returnValue(of(randomQuestion)),
    };
    resultsServiceMock = {
      results: new BehaviorSubject<Results[]>([
        { id: 1, correctness: 0 },
        { id: 2, correctness: 100 },
      ]),
      getPercentById: jasmine.createSpy('getPercentById').and.returnValue(of(50)),
    };
    routerMock = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), QuizPage],
      providers: [
        { provide: QuestionsService, useValue: questionsServiceMock },
        { provide: ResultsService, useValue: resultsServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: { queryParams: queryParams$ } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizPage);
    component = fixture.componentInstance;
  }));

  afterEach(() => {
    fixture.destroy();
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read the isRandomized flag from localStorage', () => {
    localStorage.setItem('isRandomized', 'true');
    const newFixture = TestBed.createComponent(QuizPage);
    expect(newFixture.componentInstance.isRandomized).toBeTrue();
  });

  describe('getNextQuestion', () => {
    it('should select the first uncompleted question when not randomized', fakeAsync(() => {
      component.getNextQuestion();
      expect(component.question).toBeNull();

      tick(1000);

      expect(questionsServiceMock.getQuestionById).toHaveBeenCalledWith(1);
      expect(component.question?.id).toBe(1);
      expect(component.percent$).toBeTruthy();
    }));

    it('should pick a random uncompleted question when randomized', fakeAsync(() => {
      component.isRandomized = true;
      spyOn(Math, 'random').and.returnValue(0);

      component.getNextQuestion();
      tick(1000);

      expect(questionsServiceMock.getQuestionById).toHaveBeenCalledWith(1);
      expect(component.question?.id).toBe(1);
    }));

    it('should fall back to a random question when everything is completed', fakeAsync(() => {
      resultsServiceMock.results.next([{ id: 1, correctness: 100 }]);

      component.getNextQuestion();
      tick(1000);

      expect(questionsServiceMock.getRandomQuestion).toHaveBeenCalled();
      expect(component.question?.id).toBe(randomQuestion.id);
    }));
  });

  describe('ngOnInit', () => {
    it('should load the next question on init', fakeAsync(() => {
      component.ngOnInit();
      tick(1000);

      expect(component.question?.id).toBe(1);
    }));

    it('should refresh the question when needToUpdate query param is set', fakeAsync(() => {
      queryParams$.next({ needToUpdate: true });

      component.ngOnInit();
      tick(1000);

      // navigate is called to clear the query params
      expect(routerMock.navigate).toHaveBeenCalledWith(['.'], jasmine.objectContaining({ queryParams: {} }));
      expect(component.question?.id).toBe(1);
    }));
  });

  describe('toggleQuiz', () => {
    it('should persist the randomize flag and load a new question', fakeAsync(() => {
      component.toggleQuiz({ detail: { checked: true } } as CustomEvent<{ checked: boolean }>);

      expect(component.isRandomized).toBeTrue();
      expect(localStorage.getItem('isRandomized')).toBe('true');

      tick(1000);
      expect(component.question?.id).toBeDefined();
    }));
  });

  describe('navigation', () => {
    it('visitTheoryPage should navigate to question-info with fromQuiz flag', () => {
      component.question = q1;
      component.visitTheoryPage();

      expect(routerMock.navigate).toHaveBeenCalledWith(
        ['tabs/questions/question-info'],
        jasmine.objectContaining({ queryParams: { questionId: 1, fromQuiz: true } })
      );
    });

    it('submitAnswer should navigate to the answer-structure page', () => {
      component.question = q2;
      component.submitAnswer();

      expect(routerMock.navigate).toHaveBeenCalledWith(
        ['tabs/quiz/answer-structure'],
        jasmine.objectContaining({ queryParams: { questionId: 2 } })
      );
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete without throwing', () => {
      component.ngOnInit();
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });
});
