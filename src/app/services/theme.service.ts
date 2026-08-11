import { Injectable } from '@angular/core';
import { ThemeType } from 'src/app/models/app.model';
import { Themes } from 'src/app/enums/app.enum';

// Colors the OS status bar in an installed PWA; must match --ion-background-color in src/theme/variables.scss
const THEME_COLORS: Record<ThemeType, string> = {
  [Themes.light]: '#f4f1e9',
  [Themes.dark]: '#16171a'
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  prefersDark: MediaQueryList;
  private _currentTheme: ThemeType;

  constructor() {
    this._initTheme();
  }

  get currentTheme(): ThemeType {
    return this._currentTheme;
  }

  // Add or remove the "dark" class based on if the media query matches
  toggleDarkTheme(shouldAdd: boolean): void {
    document.body.classList.toggle(Themes.dark, shouldAdd);
    this._currentTheme = shouldAdd ? Themes.dark : Themes.light;
    localStorage.setItem('theme', this._currentTheme);
    this._updateThemeColorMeta();
  }

  private _updateThemeColorMeta(): void {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[this._currentTheme]);
  }

  private _initTheme(): void {
    this._currentTheme = localStorage.getItem('theme') as ThemeType;
    if (this._currentTheme) this.toggleDarkTheme(this._currentTheme === Themes.dark);
    else this._getDevicePreferedTheme();
  }

  private _getDevicePreferedTheme(): void {
    // Use matchMedia to check the user preference
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.toggleDarkTheme(this.prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    this.prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
  }
}
