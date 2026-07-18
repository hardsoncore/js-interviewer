import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonicModule } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AppService } from './services/app.service';
import { ThemeService } from './services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonicModule]
})
export class AppComponent {
  private appService = inject(AppService);
  private theme = inject(ThemeService);
  private router = inject(Router);

  constructor() {
    // drop focus left on the tapped control (e.g. a nav button) so it doesn't
    // keep its focused/hover overlay after the page changes
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => {
      (document.activeElement as HTMLElement | null)?.blur();
    });
  }
}
