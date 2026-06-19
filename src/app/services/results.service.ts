import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Results } from '../models/question.model';
import { QuestionsService } from './questions.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private _results: BehaviorSubject<Results[]> = new BehaviorSubject([]);

  constructor(
    private questionsService: QuestionsService,
  ) {
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

  setResults(results: Results[]): void {
    this._results.next(results);
    localStorage.setItem('results', JSON.stringify(results));
  }

  setResult(result: Results): void {
    const currentResults = this._results.getValue();
    const exists = currentResults.some(r => Number(r.id) === Number(result.id));

    // Immutable update: build a new array (and new object for the changed item)
    // so the BehaviorSubject emits a fresh reference and never mutates its own state.
    const updatedResults = exists
      ? currentResults.map(r => (Number(r.id) === Number(result.id) ? { ...r, ...result } : r))
      : [...currentResults, result];

    this.setResults(updatedResults);
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
}
