import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-splash-inicial',
  templateUrl: './splash-inicial.page.html',
  styleUrls: ['./splash-inicial.page.scss'],
})
export class SplashInicialPage implements OnInit {

  constructor(
    public router:Router
  ) {
  }

  ngOnInit() {
  }

  onSplashAnimado(){
    this.router.navigateByUrl('splashAnimado');
  }

}
