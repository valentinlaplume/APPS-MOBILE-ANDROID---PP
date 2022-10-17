import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';

import { ValidatorService } from './../services/validator.service';

import { Router } from '@angular/router';
import { stringLength } from '@firebase/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  darkMode: boolean = true;

  muestroSpinner:boolean = false;
  public email:string='';
  public password:string='';

  public validaLogin:string='';
  
  constructor(
    private authSvc: AuthService, 
    private router: Router) 
  {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  ngOnInit() {
  }

  change() {
    let audio = new Audio();
    audio.src = '../../assets/sonidos/on.mp3';
    audio.load();
    audio.play();
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }

  onSonidoIngresoVolver(){
    let audio = new Audio();
    audio.src = '../../assets/sonidos/volver.mp3';
    audio.load();
    audio.play();
  }

  onSonidoIngreso(sonido:string = 'on.mp3'){
    let audio = new Audio();
    audio.src = '../../assets/sonidos/';
    audio.load();
    audio.play();
  }

  onSpinnerLogin(){
    this.validaLogin = '';
    this.muestroSpinner = true;
    setTimeout(() => {
      this.onLogin();
      this.muestroSpinner = false;
    }, 1000);
  }

  async onLogin() {
    try {
      const user = await this.authSvc.login(this.email, this.password);
      console.log(user);
      if (user != null && user != undefined) {
        let audio = new Audio();
        audio.src = '../../assets/sonidos/enviar.ogg';
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
        this.validaLogin = this.authSvc.msjError;
        if(this.validaLogin == '') { this.validaLogin = "Verifique que el mail y la contraseña sean correctas";}
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      console.log(user);
      if (user != null && user != undefined) {
        this.onSonidoIngresoVolver();
        this.validaLogin = '';
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log('isEmailVerified -> ', isVerified);
        this.redirectUser(isVerified);
      }
      else{
        this.validaLogin = this.authSvc.msjError;
        if(this.validaLogin == '') { this.validaLogin = "Verifique que el mail y la contraseña sean correctas";}
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    this.validaLogin = '';
    this.router.navigate(['../home']).then(e =>{
      this.email = "";
      this.password = "";
      this.validaLogin = "";
    });
    // if (isVerified) {
    //   this.router.navigate(['../home']);
    // } else {
    //   this.router.navigate(['../verify-email']);
    // }
  }

  public onLoginUsuarioAdministrador(){
    this.onSonidoIngresoVolver();
    this.email = "admin@admin.com";
    this.password = "111111";
  }

  public onLoginUsuarioModerador(){
    this.onSonidoIngresoVolver();
    this.email = "tester@tester.com";
    this.password = "555555";
  }

  public onLoginUsuarioComun(){
    this.onSonidoIngresoVolver();
    this.email = "invitado@invitado.com";
    this.password = "222222";
  }
}
