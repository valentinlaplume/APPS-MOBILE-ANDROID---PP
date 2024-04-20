import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-estatico',
  templateUrl: './splash-estatico.page.html',
  styleUrls: ['./splash-estatico.page.scss'],
})
export class SplashEstaticoPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  onclick(){
    this.router.navigate(['splash-animado']);
  }
}
