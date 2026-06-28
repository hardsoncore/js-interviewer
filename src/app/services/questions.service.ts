import { Injectable, inject } from '@angular/core';
import { Question } from '../models/question.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { questions as listOfQA_ukr } from 'src/assets/content/ukr/questions';
import { questions as listOfQA_eng } from 'src/assets/content/eng/questions';
import { questions as listOfQA_ru } from 'src/assets/content/rus/questions';
import { AppService } from './app.service';
import { Languages } from 'src/app/enums/app.enum';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private appService = inject(AppService);

  private _questions = new BehaviorSubject<Question[]>([]);

  constructor() {
    this.setQuestions();
  }

  get questions(): Observable<Question[]> {
    return this._questions.asObservable();
  }

  public getRandomQuestion(): Observable<Question> {
    return this.questions.pipe(
      map(qs => qs[Math.floor(Math.random() * qs.length)])
    );
  }

  public getQuestionById(id: number | string): Question {
    return this._questions.getValue().find(q => Number(q.id) === Number(id));
  }

  private setQuestions() {
    const language = this.appService.language;

    if (language === Languages.eng) {
      this._questions.next(listOfQA_eng);
    }
    else if (language === Languages.ukr) {
      this._questions.next(listOfQA_ukr);
    }
    else if (language === Languages.rus) {
      this._questions.next(listOfQA_ru);
    } else {
      this._questions.next(listOfQA_eng);
    }
  }
}
