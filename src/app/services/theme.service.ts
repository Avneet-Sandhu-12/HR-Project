import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme: boolean = false;

  setDarkTheme(isDark: boolean): void {
    this.isDarkTheme = isDark;
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.setDarkTheme(true);
    } else {
      this.setDarkTheme(false);
    }
  }

  getTheme(): boolean {
    return localStorage.getItem('theme') === 'dark';
  }
}
