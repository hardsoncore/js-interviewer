import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideRouter } from '@angular/router';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';

import { AnswerStructurePage } from './answer-structure.page';
import { StaticTranslateLoader } from 'src/app/i18n/static-translate.loader';
import { Languages } from 'src/app/enums/app.enum';

describe('AnswerStructurePage', () => {
  let component: AnswerStructurePage;
  let fixture: ComponentFixture<AnswerStructurePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), AnswerStructurePage],
    providers: [
        provideRouter([]),
        provideTranslateService({ loader: provideTranslateLoader(StaticTranslateLoader), fallbackLang: Languages.eng, lang: Languages.eng }),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(AnswerStructurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
