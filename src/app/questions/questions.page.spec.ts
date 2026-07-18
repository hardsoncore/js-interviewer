import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { QuestionsPage } from './questions.page';
import { QuestionsService } from 'src/app/services/questions.service';
import { ResultsService } from 'src/app/services/results.service';
import { Question, Results } from 'src/app/models/question.model';
import { QuestionCategories, QuestionLevels } from 'src/app/enums/questions.enum';

function makeQuestion(partial: Partial<Question> & { id: number }): Question {
  return {
    name: `Question ${partial.id}`,
    answer: `answers/${partial.id}.md`,
    level: QuestionLevels.junior,
    tags: [],
    category: QuestionCategories.javascript,
    structure: [],
    ...partial,
  };
}

describe('QuestionsPage', () => {
  let component: QuestionsPage;
  let fixture: ComponentFixture<QuestionsPage>;

  let questionsServiceMock: { questions: BehaviorSubject<Question[]> };
  let resultsServiceMock: { results: BehaviorSubject<Results[]> };
  let routerMock: { navigate: jasmine.Spy };

  const questions: Question[] = [
    makeQuestion({ id: 1, name: 'Closures in JavaScript', tags: ['functions'], category: QuestionCategories.javascript }),
    makeQuestion({ id: 2, name: 'Flexbox basics', tags: ['layout'], category: QuestionCategories.css }),
    makeQuestion({ id: 3, name: 'Change detection', tags: ['angular', 'zone'], category: QuestionCategories.angular }),
  ];

  beforeEach(waitForAsync(() => {
    questionsServiceMock = { questions: new BehaviorSubject<Question[]>(questions) };
    resultsServiceMock = {
      results: new BehaviorSubject<Results[]>([{ id: 1, correctness: 80 }]),
    };
    routerMock = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), QuestionsPage],
      providers: [
        { provide: QuestionsService, useValue: questionsServiceMock },
        { provide: ResultsService, useValue: resultsServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsPage);
    component = fixture.componentInstance;
  }));

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should populate questions, filteredQuestions and results from services', () => {
      component.ngOnInit();

      expect(component.questions).toEqual(questions);
      expect(component.filteredQuestions).toEqual(questions);
      expect(component.visibleQuestions).toEqual(questions);
      expect(component.results).toEqual([{ id: 1, correctness: 80 }]);
      expect(component.percentById.get(1)).toBe(80);
    });

    it('should render only the first batch when there are many questions', () => {
      const manyQuestions = Array.from({ length: 80 }, (_, i) => makeQuestion({ id: i + 1 }));
      questionsServiceMock.questions.next(manyQuestions);

      component.ngOnInit();

      expect(component.filteredQuestions.length).toBe(80);
      expect(component.visibleQuestions.length).toBe(30);
    });
  });

  describe('loadMore', () => {
    it('should append the next batch and complete the infinite scroll event', () => {
      const manyQuestions = Array.from({ length: 80 }, (_, i) => makeQuestion({ id: i + 1 }));
      questionsServiceMock.questions.next(manyQuestions);
      component.ngOnInit();

      const event = { target: { complete: jasmine.createSpy('complete') } };
      component.loadMore(event as never);

      expect(component.visibleQuestions.length).toBe(60);
      expect(event.target.complete).toHaveBeenCalled();

      component.loadMore(event as never);
      expect(component.visibleQuestions.length).toBe(80);
    });
  });

  describe('handleInput', () => {
    beforeEach(() => component.ngOnInit());

    function inputEvent(value: string): Event {
      return { target: { value } } as unknown as Event;
    }

    it('should filter by question name', () => {
      component.handleInput(inputEvent('flexbox'));

      expect(component.filteredQuestions.length).toBe(1);
      expect(component.filteredQuestions[0].id).toBe(2);
      expect(component.visibleQuestions).toEqual(component.filteredQuestions);
    });

    it('should filter by tag', () => {
      component.handleInput(inputEvent('zone'));

      expect(component.filteredQuestions.map(q => q.id)).toEqual([3]);
    });

    it('should filter by category', () => {
      component.handleInput(inputEvent('css'));

      expect(component.filteredQuestions.map(q => q.id)).toEqual([2]);
    });

    it('should filter by id', () => {
      component.handleInput(inputEvent('3'));

      expect(component.filteredQuestions.map(q => q.id)).toEqual([3]);
    });

    it('should reset to all questions when the query is empty', () => {
      component.handleInput(inputEvent('flexbox'));
      component.handleInput(inputEvent('   '));

      expect(component.filteredQuestions).toEqual(questions);
      expect(component.visibleQuestions).toEqual(questions);
    });

    it('should return an empty list when nothing matches', () => {
      component.handleInput(inputEvent('nonexistent-term'));

      expect(component.filteredQuestions).toEqual([]);
    });
  });

  describe('helpers', () => {
    it('trackById should return the question id', () => {
      expect(component.trackById(0, questions[0])).toBe(1);
    });

    it('getPercent should return the stored percent or 0', () => {
      component.ngOnInit();

      expect(component.getPercent(1)).toBe(80);
      expect(component.getPercent(999)).toBe(0);
    });

    it('clickOnQuestion should navigate to question-info with the question id', () => {
      component.clickOnQuestion(questions[1]);

      expect(routerMock.navigate).toHaveBeenCalledWith(
        ['tabs/questions/question-info'],
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
