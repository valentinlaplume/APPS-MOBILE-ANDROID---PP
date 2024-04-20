import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-animado',
  templateUrl: './splash-animado.page.html',
  styleUrls: ['./splash-animado.page.scss'],
})
export class SplashAnimadoPage implements OnInit {

  constructor(public router:Router) { }


  ngOnInit() {
    setTimeout(() => {
    this.router.navigate(['login']);
    }, 3000);
  }

}
