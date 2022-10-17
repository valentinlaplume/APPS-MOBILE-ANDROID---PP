import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public router:Router
  ) {
    SplashScreen.hide();
    this.initializeApp();
    this.changeDarkMode();
  }

  initializeApp(){
    this.router.navigateByUrl('splashInicial');
  }

  changeDarkMode()
  {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    console.log('prefersDark ->', prefersDark);
    if (prefersDark.matches){
      document.body.classList.toggle('dark');
    }
  }

}
