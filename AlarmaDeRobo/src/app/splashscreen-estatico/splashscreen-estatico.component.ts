import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-splashscreen-estatico',
  templateUrl: './splashscreen-estatico.component.html',
  styleUrls: ['./splashscreen-estatico.component.scss'],
})
export class SplashscreenEstaticoComponent implements OnInit {
  constructor(private appComponent: AppComponent) {}

  ngOnInit() {}

  onClick() {
    this.appComponent.cargarTerminada = 1;
  }
}
