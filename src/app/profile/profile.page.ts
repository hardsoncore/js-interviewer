import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ThemeType } from 'src/app/models/app.model';
import { Languages, Themes } from 'src/app/enums/app.enum';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ResultsService } from 'src/app/services/results.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {
  imgLoaded = false;
  profile: Profile;
  avPercent: number;
  completedCount = 0;
  appVersion: string;
  languages = Languages;

  private destroy$ = new Subject<void>();
  private timerId: any;

  constructor(
    private theme: ThemeService,
    private alertController: AlertController,
    private profileService: ProfileService,
    private resultsService: ResultsService,
    private appService: AppService
  ) {
    this.appVersion = this.appService.appVersion;
  }

  get currentTheme(): ThemeType {
    return this.theme.currentTheme;
  }

  set currentTheme(value: ThemeType) {
    this.theme.toggleDarkTheme(value === Themes.dark);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get currentLanguage(): Languages {
    return this.appService.language;
  }

  set currentLanguage(value: Languages) {
    this.appService.language = value;
  }

  ngOnInit(): void {
    this.profileService.profile.pipe(takeUntil(this.destroy$)).subscribe(profile => this.profile = profile);
    this.resultsService.getAveragePercent().pipe(takeUntil(this.destroy$)).subscribe(percent => this.avPercent = percent);
    this.resultsService.results.pipe(takeUntil(this.destroy$)).subscribe(results => {
      this.completedCount = results.filter(r => r.correctness === 100).length;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  public onImageLoad(): void {
    // will work without a timeout, but it looks more intresting with a timeout
    this.timerId = setTimeout(() => {
      this.imgLoaded = true;
    }, 1000);
  }

  public async clearResults() {
    const usersChoise = await this._presentAlert();
    if (usersChoise === 'ok') {
      this.resultsService.setResults([]);
      location.reload();
    }
  }

  private async _presentAlert(): Promise<string> {
    const alert = await this.alertController.create({
      cssClass: 'clear-storage-alert',
      header: 'All your progress will be lost',
      message: 'Are you sure you want to clear your progress and start over again?',
      buttons: [
        'Cancel',
        {
          text: 'Clear',
          cssClass: 'danger-button',
          role: 'ok'
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    return role;
  }
}
