import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';

import { Languages } from 'src/app/enums/app.enum';
import { eng, Translations } from './eng';
import { ukr } from './ukr';
import { rus } from './rus';

const TRANSLATIONS: Record<Languages, Translations> = {
  [Languages.eng]: eng,
  [Languages.ukr]: ukr,
  [Languages.rus]: rus,
};

// Dictionaries are compiled into the bundle: language changes reload the app,
// so a synchronous loader avoids any flash of untranslated keys.
@Injectable()
export class StaticTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<Translations> {
    return of(TRANSLATIONS[lang as Languages] ?? eng);
  }
}
