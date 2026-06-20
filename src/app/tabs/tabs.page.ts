import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TabsPage {

  constructor() {}

}
