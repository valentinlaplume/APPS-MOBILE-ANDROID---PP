import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router: Router,
    public authService:AuthService) 
  {
    setTimeout(() => {
      console.log("SplashPage");
      this.router.navigateByUrl('login').then(e => {
        this.authService.pasoPorSplash = true;
      });
    }, 3000);
  }

  ngOnInit() {
  }

}
