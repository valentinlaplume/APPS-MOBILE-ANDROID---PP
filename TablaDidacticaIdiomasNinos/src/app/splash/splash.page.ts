import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router: Router) {
    setTimeout(() => {
      let audio = new Audio();
      audio.src = '../../assets/sonidos/volver.mp3';
      audio.load();
      audio.play();
      this.router.navigateByUrl('login');
    }, 3000);
  }

  ngOnInit() {
  }

}
