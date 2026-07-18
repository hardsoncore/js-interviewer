import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { StaticTranslateLoader } from 'src/app/i18n/static-translate.loader';

import { ProfilePage } from './profile.page';
import { ThemeService } from 'src/app/services/theme.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ResultsService } from 'src/app/services/results.service';
import { StreakService } from 'src/app/services/streak.service';
import { AppService } from 'src/app/services/app.service';
import { Languages, Themes } from 'src/app/enums/app.enum';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  let themeMock: { currentTheme: string; toggleDarkTheme: jasmine.Spy };
  let profileServiceMock: { profile: Observable<typeof profile> };
  let resultsServiceMock: { getAveragePercent: jasmine.Spy; setResults: jasmine.Spy };
  let streakServiceMock: { streak$: Observable<number>; hasActivityToday$: Observable<boolean> };
  let appServiceMock: { appVersion: string; language: Languages };
  let routerMock: { navigate: jasmine.Spy };
  let alertMock: { present: jasmine.Spy; onDidDismiss: jasmine.Spy };
  let alertControllerMock: { create: jasmine.Spy };
  let dismissRole: string;

  const profile = { username: 'JS_CODE_MASTER', avatarUrl: 'assets/avatar.jpeg' };

  beforeEach(waitForAsync(() => {
    dismissRole = 'ok';

    themeMock = { currentTheme: Themes.light, toggleDarkTheme: jasmine.createSpy('toggleDarkTheme') };
    profileServiceMock = { profile: of(profile) };
    resultsServiceMock = {
      getAveragePercent: jasmine.createSpy('getAveragePercent').and.returnValue(of(42)),
      setResults: jasmine.createSpy('setResults'),
    };
    streakServiceMock = { streak$: of(5), hasActivityToday$: of(true) };
    appServiceMock = { appVersion: 'v1.2.3', language: Languages.eng };
    routerMock = { navigate: jasmine.createSpy('navigate') };

    alertMock = {
      present: jasmine.createSpy('present').and.resolveTo(),
      onDidDismiss: jasmine.createSpy('onDidDismiss').and.callFake(() => Promise.resolve({ role: dismissRole })),
    };
    alertControllerMock = { create: jasmine.createSpy('create').and.resolveTo(alertMock) };

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ProfilePage],
      providers: [
        { provide: ThemeService, useValue: themeMock },
        { provide: ProfileService, useValue: profileServiceMock },
        { provide: ResultsService, useValue: resultsServiceMock },
        { provide: StreakService, useValue: streakServiceMock },
        { provide: AppService, useValue: appServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: AlertController, useValue: alertControllerMock },
        provideTranslateService({ loader: provideTranslateLoader(StaticTranslateLoader), fallbackLang: Languages.eng, lang: Languages.eng }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
  }));

  afterEach(() => {
    fixture.destroy();
  });

  // NOTE: ngOnInit is invoked directly instead of via fixture.detectChanges().
  // Rendering the template fires the <img (load)> handler (onImageLoad), which schedules
  // a real timer that leaks across tests and also triggers NG0100 on the `!imgLoaded` binding.

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the app version from AppService', () => {
    expect(component.appVersion).toBe('v1.2.3');
  });

  describe('ngOnInit', () => {
    it('should populate profile, average percent and streak state from services', () => {
      component.ngOnInit();

      expect(component.profile).toEqual(profile);
      expect(component.avPercent).toBe(42);
      expect(component.daysStreak).toBe(5);
      expect(component.hasActivityToday).toBeTrue();
    });
  });

  describe('currentTheme', () => {
    it('should read the current theme from ThemeService', () => {
      themeMock.currentTheme = Themes.dark;
      expect(component.currentTheme).toBe(Themes.dark);
    });

    it('should enable dark theme when set to dark', () => {
      component.currentTheme = Themes.dark;
      expect(themeMock.toggleDarkTheme).toHaveBeenCalledWith(true);
    });

    it('should disable dark theme when set to light', () => {
      component.currentTheme = Themes.light;
      expect(themeMock.toggleDarkTheme).toHaveBeenCalledWith(false);
    });
  });

  describe('currentLanguage', () => {
    it('should read the language from AppService', () => {
      appServiceMock.language = Languages.ukr;
      expect(component.currentLanguage).toBe(Languages.ukr);
    });

    it('should delegate language changes to AppService', () => {
      component.currentLanguage = Languages.rus;
      expect(appServiceMock.language).toBe(Languages.rus);
    });
  });

  describe('onImageLoad', () => {
    // The real <img (load)> event may fire during component creation and flip imgLoaded via a
    // real timer; reset state so the assertions target the timer scheduled inside fakeAsync.
    it('should set imgLoaded to true after a 1s delay', fakeAsync(() => {
      component.imgLoaded = false;

      component.onImageLoad();
      expect(component.imgLoaded).toBeFalse();

      tick(1000);
      expect(component.imgLoaded).toBeTrue();
    }));

    it('should not set imgLoaded if destroyed before the timer fires', fakeAsync(() => {
      component.imgLoaded = false;

      component.onImageLoad();
      component.ngOnDestroy();

      tick(1000);
      expect(component.imgLoaded).toBeFalse();
    }));
  });

  describe('goToHowToLearn', () => {
    it('should navigate to the how-to-learn subpage', () => {
      component.goToHowToLearn();
      expect(routerMock.navigate).toHaveBeenCalledWith(['tabs/profile/how-to-learn']);
    });
  });

  describe('clearResults', () => {
    it('should clear results when the user confirms', async () => {
      dismissRole = 'ok';
      // location.reload() cannot be stubbed in the test browser; make setResults throw a
      // sentinel so execution stops before reload() while still proving it was called.
      resultsServiceMock.setResults.and.throwError('stop-before-reload');

      await component.clearResults().catch(() => undefined);

      expect(alertControllerMock.create).toHaveBeenCalled();
      expect(resultsServiceMock.setResults).toHaveBeenCalledWith([]);
    });

    it('should not clear results when the user cancels', async () => {
      dismissRole = 'cancel';

      await component.clearResults();

      expect(alertControllerMock.create).toHaveBeenCalled();
      expect(resultsServiceMock.setResults).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete without errors and stop pending timers', fakeAsync(() => {
      component.ngOnInit();
      component.imgLoaded = false;
      component.onImageLoad();

      expect(() => component.ngOnDestroy()).not.toThrow();

      tick(1000);
      expect(component.imgLoaded).toBeFalse();
    }));
  });
});
