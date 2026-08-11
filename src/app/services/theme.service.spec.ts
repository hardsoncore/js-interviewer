import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let themeColorMeta: HTMLMetaElement;

  beforeEach(() => {
    themeColorMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the theme-color meta tag when toggling the theme', () => {
    service.toggleDarkTheme(true);
    expect(themeColorMeta.content).toBe('#16171a');

    service.toggleDarkTheme(false);
    expect(themeColorMeta.content).toBe('#f4f1e9');
  });
});
