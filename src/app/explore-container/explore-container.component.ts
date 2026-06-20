import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-explore-container',
    templateUrl: './explore-container.component.html',
    styleUrls: ['./explore-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class ExploreContainerComponent {
  @Input() name: string;
}
