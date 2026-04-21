import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Results } from '../models/question.model';
import { QuestionsService } from './questions.service';

interface StreakData {
  streak: number;
  lastDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private _results: BehaviorSubject<Results[]> = new BehaviorSubject([]);
  private _streak: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private questionsService: QuestionsService,
  ) {
    this._initStreak();

    this.questionsService.questions.subscribe(questions => {
      let storageResults: Results[] = [];
      const stored = localStorage.getItem('results');

      if (stored) {
        try {
          storageResults = JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse results from local storage', e);
        }
      }

      const mergedResults = questions.map(q => {
        const existingResult = storageResults.find(r => r.id === q.id);
        return existingResult ? existingResult : { id: q.id, correctness: 0 };
      }) as Results[];

      this.setResults(mergedResults);
    });
  }

  get results(): Observable<Results[]> {
    return this._results.asObservable();
  }

  get streak$(): Observable<number> {
    return this._streak.asObservable();
  }

  setResults(results: Results[]): void {
    this._results.next(results);
    localStorage.setItem('results', JSON.stringify(results));
  }

  getAveragePercent(): Observable<number> {
    return this._results.pipe(
      map(results => {
        if (!results || results.length === 0) {
          return 0;
        }
        return Math.round(results.reduce((prev, curr) => prev + curr.correctness, 0) / results.length);
      })
    );
  }

  getPercentById(id: number | string): Observable<number> {
    return this._results.pipe(
      map(results => results.find(result => Number(result.id) === Number(id))?.correctness || 0)
    );
  }

  recordActivity(): void {
    const today = this._getDateString(new Date());
    const data = this._loadStreakData();

    if (data.lastDate === today) {
      return;
    }

    const yesterday = this._getDateString(new Date(Date.now() - 86400000));
    data.streak = data.lastDate === yesterday ? data.streak + 1 : 1;
    data.lastDate = today;

    this._saveStreakData(data);
    this._streak.next(data.streak);
  }

  private _initStreak(): void {
    const data = this._loadStreakData();
    const yesterday = this._getDateString(new Date(Date.now() - 86400000));

    if (data.lastDate && data.lastDate < yesterday) {
      data.streak = 0;
      this._saveStreakData(data);
    }

    this._streak.next(data.streak);
  }

  private _getDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private _loadStreakData(): StreakData {
    try {
      const stored = localStorage.getItem('streak');
      if (stored) {
        return JSON.parse(stored) as StreakData;
      }
    } catch { }
    return { streak: 0, lastDate: '' };
  }

  private _saveStreakData(data: StreakData): void {
    localStorage.setItem('streak', JSON.stringify(data));
  }
}
