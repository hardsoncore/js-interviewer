import { Injectable } from '@angular/core';
import { versionInfo } from 'get-version';
import { Languages } from 'src/app/enums/app.enum';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // about version changing logic read -> https://semver.org/lang/ru/#spec-item-6  (пункты 6, 7, 8)
  private _appVersion: string = versionInfo?.raw || 'v0.0.0';

  public get appVersion(): string {
    return this._appVersion;
  }

  public get language(): Languages {
    const storedLanguage = localStorage.getItem('language') as Languages | null;
    if (storedLanguage && Object.values(Languages).includes(storedLanguage)) {
      return storedLanguage;
    }

    const browserLanguage = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage;
    const shortCode = browserLanguage ? browserLanguage.split('-')[0].toLowerCase() : '';

    let mappedLanguage: Languages | undefined;
    switch (shortCode) {
      case 'en':
        mappedLanguage = Languages.eng;
        break;
      case 'uk':
        mappedLanguage = Languages.ukr;
        break;
      case 'ru':
        mappedLanguage = Languages.rus;
        break;
      default:
        mappedLanguage = undefined;
    }

    return mappedLanguage || Languages.rus;
  }

  set language(value: Languages) {
    if (!Object.values(Languages).includes(value)) return;

    localStorage.setItem('language', value);
    location.reload();
  }
}
