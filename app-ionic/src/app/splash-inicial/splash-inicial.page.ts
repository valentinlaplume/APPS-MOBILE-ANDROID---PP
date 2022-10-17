import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-splash-inicial',
  templateUrl: './splash-inicial.page.html',
  styleUrls: ['./splash-inicial.page.scss'],
})
export class SplashInicialPage implements OnInit {

  constructor(
    public router:Router
  ) {
    SplashScreen.hide();
  }

  ngOnInit() {
  }

  onSplashAnimado(){
    let audio = new Audio();
    audio.src = '../../assets/sonidos/volver.mp3';
    audio.load();
    audio.play();
    console.log('onSplashAnimado')
    this.router.navigateByUrl('splashAnimado');
  }

}
