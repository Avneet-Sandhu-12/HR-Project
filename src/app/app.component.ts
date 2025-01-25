import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  navbarOpen = false;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  selectedLanguage: string = 'en';

  constructor(private themeService: ThemeService, private translate: TranslateService) {
    this.themeService.loadTheme();
   

    const savedLang = localStorage.getItem('language') || 'en';
    translate.use(savedLang);
    
  }
  
  title = 'advance-project';
  
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

