import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionsPage } from './questions.page';

describe('QuestionsPage', () => {
  let component: QuestionsPage;
  let fixture: ComponentFixture<QuestionsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), QuestionsPage]
}).compileComponents();

    fixture = TestBed.createComponent(QuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
