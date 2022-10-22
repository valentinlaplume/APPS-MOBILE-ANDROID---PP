import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-splash-estatico',
  templateUrl: './splash-estatico.page.html',
  styleUrls: ['./splash-estatico.page.scss'],
})
export class SplashEstaticoPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  onSplashAnimado(){
    this.router.navigate(['home']);
  }

}
