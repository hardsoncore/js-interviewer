import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideRouter } from '@angular/router';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';

import { HowToLearnPage } from './how-to-learn.page';
import { StaticTranslateLoader } from 'src/app/i18n/static-translate.loader';
import { Languages } from 'src/app/enums/app.enum';

describe('HowToLearnPage', () => {
  let component: HowToLearnPage;
  let fixture: ComponentFixture<HowToLearnPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), HowToLearnPage],
    providers: [
        provideRouter([]),
        provideTranslateService({ loader: provideTranslateLoader(StaticTranslateLoader), fallbackLang: Languages.eng, lang: Languages.eng }),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(HowToLearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all learning steps', () => {
    const cards = fixture.nativeElement.querySelectorAll('.step-card');
    expect(cards.length).toBe(component.steps.length);
  });
});
