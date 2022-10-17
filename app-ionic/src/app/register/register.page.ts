import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';

import { ValidatorService } from './../services/validator.service';


import { Router } from '@angular/router';
import { stringLength } from '@firebase/util';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public validaEmail:string='';
  public validaPass:string='';
  private validator: ValidatorService = new ValidatorService()

  constructor(
    private authSvc: AuthService, 
    private router: Router) {}

  ngOnInit() {
  }

  private ValidatePassword(password, passwordConfirm):string{
    let lengthPassword = stringLength(password.value);
    let lengthConfirmPassword = stringLength(passwordConfirm.value);
    console.log(password);
    console.log(passwordConfirm);
    if(!lengthPassword) { return 'Ingrese contraseña'; }
    if(lengthPassword < 6) { return 'La contraseña debe contener al menos 6 caracteres'; }
    
    if(!lengthConfirmPassword) { return 'Ingrese confirmacion de contraseña'; }

    if(password.value != passwordConfirm.value) { return 'Las contraseñas no coinciden'; }

    return '';
  }

  async onRegister(email, password, passwordConfirm) {
    console.log(email.value);
    

    let isValidEmail = this.validator.isValidEmail(email.value);
    if(!isValidEmail) { this.validaEmail  = 'Indique mail válido'; return false; }
    
    let rValidatePassword = this.ValidatePassword(password, passwordConfirm);
    if(rValidatePassword != '') { this.validaPass = rValidatePassword; return false; }

    this.validaEmail = '';
    this.validaPass = '';

    try {
      const user = await this.authSvc.register(email.value, password.value);
      console.log(user);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }else{
        this.validaPass = 'Ocurrió un error con el registro, intente en un rato';
      }
    } catch (error) {
      this.validaPass = error;
      console.log('Error', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['../home']);
    } else {
      this.router.navigate(['../verify-email']);
    }
  }

  // focusContrasena(password){
  //   this.validaEmail = this.ValidatePassword(password);
  // }
}
