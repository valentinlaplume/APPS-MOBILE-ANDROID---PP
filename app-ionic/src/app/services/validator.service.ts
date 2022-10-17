import { Injectable }    from '@angular/core';

@Injectable()
export class ValidatorService {

  public isValidEmail(email: string) :boolean {
    let mailValido = false;
      'use strict';

    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    console.log(email.match(EMAIL_REGEX));
    if (email.match(EMAIL_REGEX)) { mailValido = true; }
    
    return mailValido;
  }

}
