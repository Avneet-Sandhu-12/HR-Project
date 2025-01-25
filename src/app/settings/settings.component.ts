import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  selectedLanguage: string = 'en';
  isDarkMode: boolean = false;
  notificationsEnabled: boolean = false;

  constructor(private themeService: ThemeService, private translate: TranslateService, private authService: AuthService,private snackBar: MatSnackBar) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');

    
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      this.selectedLanguage = savedLang;
      this.translate.use(savedLang);
    }

    const savedNotification = localStorage.getItem('notificationsEnabled');
    this.notificationsEnabled = savedNotification === 'true';
  }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.getTheme();
  }

  switchLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang); 
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkTheme(this.isDarkMode);
  }

  toggleNotifications(): void {
    this.notificationsEnabled = !this.notificationsEnabled;
    localStorage.setItem('notificationsEnabled', String(this.notificationsEnabled));
  }
  logout() {
    this.authService.logout();
    this.showNotification('User LogOut');
  }
  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, verticalPosition: 'top' });
  }
}
