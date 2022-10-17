import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';

// import { ValidatorService } from './../services/validator.service';

import { Router } from '@angular/router';
import { stringLength } from '@firebase/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email:string='';
  public password:string='';

  public validaLogin:string='';
  public validaEmail:string='';
  public validaPass:string='';
  
  // private validator: ValidatorService = new ValidatorService();

  constructor(
    private authSvc: AuthService, 
    private router: Router) {}

  ngOnInit() {
  }

  async onLogin() {
    try {
      const user = await this.authSvc.login(this.email, this.password);
      console.log(user);
      if (user) {
        this.email = "";
        this.password = "";
        let audio = new Audio();
        audio.src = '../../assets/sonidos/on.mp3';
        audio.load();
        audio.play();
        this.validaLogin = '';
        this.router.navigate(['../home2']);
        // const isVerified = this.authSvc.isEmailVerified(user);
        // console.log('isEmailVerified -> ', isVerified);
        // this.redirectUser(isVerified);
      }
      else{
        let audio = new Audio();
        audio.src = '../../assets/sonidos/error.ogg';
        audio.load();
        audio.play();
        this.validaLogin = "Verifique que el mail y la contraseña sean correctas";
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      console.log(user);
      if (user) {
        this.email = "";
        this.password = "";
        let audio = new Audio();
        audio.src = '../../assets/sonidos/on.mp3';
        audio.load();
        audio.play();
        this.validaLogin = '';
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log('isEmailVerified -> ', isVerified);
        this.redirectUser(isVerified);
      }
      else{
        let audio = new Audio();
        audio.src = '../../assets/sonidos/error.ogg';
        audio.load();
        audio.play();
        this.validaLogin = "Verifique que el mail y la contraseña sean correctas";
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['../home2']);
    } else {
      this.router.navigate(['../verify-email']);
    }
  }

  onSonidoIngresoVolver(){
    let audio = new Audio();
    audio.src = '../../assets/sonidos/volver.mp3';
    audio.load();
    audio.play();
  }
  
  public onAdmin(){
    this.onSonidoIngresoVolver();
    this.email = "admin@admin.com";
    this.password = "111111";
  }

  public onTester(){
    this.onSonidoIngresoVolver();
    this.email = "tester@tester.com";
    this.password = "555555";
  }

  public onInvitado(){
    this.onSonidoIngresoVolver();
    this.email = "invitado@invitado.com";
    this.password = "222222";
  }
}
