import { Component, ApplicationRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private appRef: ApplicationRef) {
    //if isStable emits true, dispatch AppIsStable to hide loading animation
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        window.dispatchEvent(new Event('AppIsStable'));
      }
    });
  }
  
  title = 'MFX APP';
}
