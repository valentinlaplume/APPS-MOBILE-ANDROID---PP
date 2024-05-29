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
  muestroSpinner: boolean = false;
  public email: string = '';
  public password: string = '';

  public validaLogin: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;

  isAdminSelected: boolean = false;
  isTesterSelected: boolean = false;
  isInvitadoSelected: boolean = false;

  // private validator: ValidatorService = new ValidatorService();

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit() {}

  onSpinnerLogin() {
    this.validaLogin = '';
    this.muestroSpinner = true;
    setTimeout(() => {
      this.onLogin();
      this.muestroSpinner = false;
    }, 1500);
  }

  setearCamposLogin() {
    this.email = '';
    this.password = '';
    this.isAdminSelected = false;
    this.isTesterSelected = false;
    this.isInvitadoSelected = false;
    this.validaLogin = '';
  }

  async onLogin() {
    try {
      const user = await this.authSvc.login(this.email, this.password);
      console.log(user);
      if (user) {
        this.setearCamposLogin();
        this.removeErrorClasses();

        let audio = new Audio();
        audio.src = '../../assets/sonidos/on.mp3';
        audio.load();
        audio.play();

        this.router.navigate(['../home']);
      } else {
        this.handleLoginError();
      }
    } catch (error) {
      console.log('Error->', error);
      this.handleLoginError();
    }
  }

  removeErrorClasses() {
    this.emailError = false;
    this.passwordError = false;
  }

  handleLoginError() {
    let audio = new Audio();
    audio.src = '../../assets/sonidos/error.ogg';
    audio.load();
    audio.play();
    this.validaLogin = 'Verifique que el mail y la contraseña sean correctas';
    this.emailError = true;
    this.passwordError = true;
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['../home2']);
    } else {
      this.router.navigate(['../verify-email']);
    }
  }

  onSonidoIngresoVolver() {
    let audio = new Audio();
    audio.src = '../../assets/sonidos/volver.mp3';
    audio.load();
    audio.play();
  }

  public onAdmin(event: any) {
    if (event.detail.checked) {
      this.isAdminSelected = true;
      this.isTesterSelected = false;
      this.isInvitadoSelected = false;
      this.email = 'admin@admin.com';
      this.password = '111111';
    }
  }

  public onTester(event: any) {
    if (event.detail.checked) {
      this.isAdminSelected = false;
      this.isTesterSelected = true;
      this.isInvitadoSelected = false;
      this.email = 'tester@tester.com';
      this.password = '555555';
    }
  }

  public onInvitado(event: any) {
    if (event.detail.checked) {
      this.isAdminSelected = false;
      this.isTesterSelected = false;
      this.isInvitadoSelected = true;
      this.email = 'invitado@invitado.com';
      this.password = '222222';
    }
  }
}
