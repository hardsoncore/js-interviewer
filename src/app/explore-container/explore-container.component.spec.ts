import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';

describe('ExploreContainerComponent', () => {
  let component: ExploreContainerComponent;
  let fixture: ComponentFixture<ExploreContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), ExploreContainerComponent]
}).compileComponents();

    fixture = TestBed.createComponent(ExploreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
