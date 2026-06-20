import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AppService } from './services/app.service';
import { ThemeService } from './services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {
  constructor(
    private appService: AppService,
    private theme: ThemeService,
  ) {}
}
