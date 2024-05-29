import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public timeLeft: number = 3;
  public interval: any;
  public cargarTerminada: number = 0;

  constructor() {}

  ngOnInit(): void {
    //this.startTimer();
  }

  public startTimer() 
  {
    setTimeout(() => {
      let audio = new Audio();
      audio.src = '../../assets/sonidos/volver.mp3';
      audio.load();
      audio.play();
      this.cargarTerminada = 2;
    }, 2000);


  }
}
