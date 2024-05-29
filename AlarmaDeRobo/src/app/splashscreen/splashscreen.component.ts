import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.scss'],
})
export class SplashscreenComponent implements OnInit {

  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {
    this.appComponent.startTimer();
  }

 
}
