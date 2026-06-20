import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StreakData } from 'src/app/models/streak.model';

const MILLIS_IN_DAY = 86400000;

@Injectable({
  providedIn: 'root'
})
export class StreakService {
  private _streak = new BehaviorSubject<number>(0);
  private _hasActivityToday = new BehaviorSubject<boolean>(false);

  constructor() {
    this._initStreak();
  }

  get streak$(): Observable<number> {
    return this._streak.asObservable();
  }

  get hasActivityToday$(): Observable<boolean> {
    return this._hasActivityToday.asObservable();
  }

  public recordActivity(): void {
    const today = this._getDateString(new Date());
    const data = this._loadStreakData();

    if (data.lastDate === today) {
      this._hasActivityToday.next(true);
      return;
    }

    const yesterday = this._getDateString(new Date(Date.now() - MILLIS_IN_DAY));
    data.streak = data.lastDate === yesterday ? data.streak + 1 : 1;
    data.lastDate = today;

    this._saveStreakData(data);
    this._streak.next(data.streak);
    this._hasActivityToday.next(true);
  }

  private _initStreak(): void {
    const data = this._loadStreakData();
    const today = this._getDateString(new Date());
    const yesterday = this._getDateString(new Date(Date.now() - MILLIS_IN_DAY));

    if (data.lastDate && data.lastDate < yesterday) {
      data.streak = 0;
      this._saveStreakData(data);
    }

    this._streak.next(data.streak);
    this._hasActivityToday.next(data.lastDate === today);
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
    } catch {
      // ignore corrupted streak data and fall back to defaults
    }
    return { streak: 0, lastDate: '' };
  }

  private _saveStreakData(data: StreakData): void {
    localStorage.setItem('streak', JSON.stringify(data));
  }
}
