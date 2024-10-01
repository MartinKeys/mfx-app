import { Component, ApplicationRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(
    private appRef: ApplicationRef, 
    private translate: TranslateService
  ) {
    // Set the default language
    this.translate.setDefaultLang('cs');    

    // Use the saved language or default to Czech
    const savedLanguage = localStorage.getItem('language') || 'cs';
    this.translate.use(savedLanguage);
    //if isStable emits true, dispatch AppIsStable to hide loading animation
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        window.dispatchEvent(new Event('AppIsStable'));
      }
    });
  }
  
  title = 'MFX APP';
}
