import { Component } from '@angular/core';
import { User } from "../shared/user.interface";
import  {  Observable ,  of   } from  'rxjs' ;
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage {
  public user$: Observable<User> =  this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  async onSendEmail(): Promise<void> {
    try {
      await this.authSvc.sendVerifcationEmail();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  ngOnDestroy(): void {
    this.authSvc.logout();
  }

  initSesion(){
    try {
      this.router.navigate(['../login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }
  


}
