import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideRouter } from '@angular/router';

import { AnswerStructurePage } from './answer-structure.page';

describe('AnswerStructurePage', () => {
  let component: AnswerStructurePage;
  let fixture: ComponentFixture<AnswerStructurePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), AnswerStructurePage],
    providers: [provideRouter([])]
}).compileComponents();

    fixture = TestBed.createComponent(AnswerStructurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
