import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideRouter } from '@angular/router';

import { HowToLearnPage } from './how-to-learn.page';

describe('HowToLearnPage', () => {
  let component: HowToLearnPage;
  let fixture: ComponentFixture<HowToLearnPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), HowToLearnPage],
    providers: [provideRouter([])]
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
