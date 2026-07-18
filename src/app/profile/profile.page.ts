import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ThemeType } from 'src/app/models/app.model';
import { Languages, Themes } from 'src/app/enums/app.enum';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ResultsService } from 'src/app/services/results.service';
import { AppService } from 'src/app/services/app.service';
import { StreakService } from '../services/streak.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonicModule, NgClass, FormsModule, TranslatePipe]
})
export class ProfilePage implements OnInit, OnDestroy {
  private router = inject(Router);
  private theme = inject(ThemeService);
  private alertController = inject(AlertController);
  private profileService = inject(ProfileService);
  private resultsService = inject(ResultsService);
  private streakService = inject(StreakService);
  private appService = inject(AppService);
  private translate = inject(TranslateService);

  imgLoaded = false;
  profile: Profile;
  avPercent: number;
  daysStreak = 0;
  hasActivityToday = false;
  appVersion: string;
  languages = Languages;

  private destroy$ = new Subject<void>();
  private timerId?: ReturnType<typeof setTimeout>;

  constructor() {
    this.appVersion = this.appService.appVersion;
  }

  get currentTheme(): ThemeType {
    return this.theme.currentTheme;
  }

  set currentTheme(value: ThemeType) {
    this.theme.toggleDarkTheme(value === Themes.dark);
  }

   
  get currentLanguage(): Languages {
    return this.appService.language;
  }

  set currentLanguage(value: Languages) {
    this.appService.language = value;
  }

  ngOnInit(): void {
    this.profileService.profile.pipe(takeUntil(this.destroy$)).subscribe(profile => this.profile = profile);
    this.resultsService.getAveragePercent().pipe(takeUntil(this.destroy$)).subscribe(percent => this.avPercent = percent);
    this.streakService.streak$.pipe(takeUntil(this.destroy$)).subscribe(streak => this.daysStreak = streak);
    this.streakService.hasActivityToday$.pipe(takeUntil(this.destroy$)).subscribe(hasActivity => this.hasActivityToday = hasActivity);
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

  public goToHowToLearn(): void {
    this.router.navigate(['tabs/profile/how-to-learn']);
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
      header: this.translate.instant('PROFILE.CLEAR_ALERT.HEADER'),
      message: this.translate.instant('PROFILE.CLEAR_ALERT.MESSAGE'),
      buttons: [
        this.translate.instant('PROFILE.CLEAR_ALERT.CANCEL'),
        {
          text: this.translate.instant('PROFILE.CLEAR_ALERT.CONFIRM'),
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
