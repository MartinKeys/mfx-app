import { Component, ApplicationRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {

  // constructor(private appRef: ApplicationRef) {
  //   this.appRef.isStable.subscribe((isStable) => {
  //     if (isStable) {
  //       // Remove the loading screen
  //       const loadingScreen = document.getElementById('loading-screen');
  //       if (loadingScreen) {
  //         loadingScreen.style.display = 'none';
  //       }
  //     }
  //   });
  // }
  // constructor(private appRef: ApplicationRef) {

  //   console.log('app-root component constructor');
  //   this.appRef.isStable.subscribe((isStable) => {
  //     if (isStable) {
  //       console.log('App is stable');
  //       // Remove the loading screen
  //       const loadingScreen = document.getElementById('loading-screen');
  //       if (loadingScreen) {
  //         console.log('Removing loading screen');
  //         loadingScreen.style.display = 'none';
  //       } else {
  //         console.warn('Loading screen element not found');
  //       }
  //     }
  //   });
  // }

  constructor(private appRef: ApplicationRef) {
    console.log('app-root component constructor');
    this.appRef.isStable.subscribe((isStable) => {
      console.log('isStable:', isStable);
      if (isStable) {
        console.log('App is stable');
        // Remove the loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
          console.log('Removing loading screen');
          loadingScreen.style.display = 'none';
        } else {
          console.warn('Loading screen element not found');
        }
      }
    });
  }
  
  title = 'Modernize Angular Admin Tempplate';
}
