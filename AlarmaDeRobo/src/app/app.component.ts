import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  timeLeft: number = 3;
  interval:any;
  cargarTerminada:boolean = false;

  constructor() 
  {}

  ngOnInit():void
  {
    this.startTimer();
  }
  
  startTimer() 
  {
    this.interval = setInterval(() => 
    {
      if(this.timeLeft > 0) 
      {
        this.timeLeft--;
      } 
      else if(this.timeLeft == 0) 
      {
        this.cargarTerminada = true;
      }
    },1000)
  }
}
