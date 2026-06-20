import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { QuestionInfoPage } from './question-info.page';

describe('QuestionInfoPage', () => {
  let component: QuestionInfoPage;
  let fixture: ComponentFixture<QuestionInfoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionInfoPage ],
      imports: [IonicModule.forRoot()],
      providers: [provideRouter([]), provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
