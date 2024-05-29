import { Injectable } from '@angular/core';

import { User } from "../shared/user.interface";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/compat/firestore';

import  {  Observable ,  of   } from  'rxjs' ;
import  { switchMap   } from  'rxjs/operators' ;
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public pasoPorSplash = false;
  public user$: Observable<User>;
  msjError: string = "";
  public emailUser:String='';

  constructor(
    public afAuth: AngularFireAuth, 
    private afs: AngularFirestore
  ) 
  {
    this.setUser();
  }

  private async setUser(){
    this.user$ = await this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          console.log(user.email)
          this.emailUser = user.email;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );

    this.user$.subscribe(e => {
      this.emailUser = e.email
    });

  }
  

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async sendVerifcationEmail(): Promise<void> {
    try {
      // this.afAuth.currentUser : nuestro usuario logeado  
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      //destructuro user a mi user
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerifcationEmail();
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new GoogleAuthProvider());
      
      this.updateUserData(user).then(e => {
        this.msjError = "";
        this.emailUser = user.email;
      })
      return user;
    } catch (error) {
      console.log('Error->', error);
      this.msjError = this.getError(error.code);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user).then(e => {
        this.msjError = "";
        this.emailUser = user.email;
      })

      return user;
    } catch (error) { 
      console.log('Error->', error);
      this.msjError = this.getError(error.code);
    }
  }

  async logout():Promise<void>{
    try {
      this.emailUser = '';
      return await this.afAuth.signOut();
    } 
    catch (error) {
      console.log('error ->', error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    console.log('userRef ->', userRef);
    
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      // ----- agregado app creditos -----
      // qr10: user.qr10,  
      // qr50: user.qr50, 
      // qr100: user.qr100, 
      // creditos: user.creditos
    };
    return userRef.set(data, { merge: true }).then(x => this.emailUser = data.email)
  }

  isEmailVerified(user: User):boolean{
    return user.emailVerified === true ? true : false;
  }

  private getError(msj:string):string{
    console.log('getError ->', msj);
    switch(msj){
      case 'auth/user-not-found':
        return 'No existe ningún registro de usuario que corresponda al correo electrónico indicado';
      case 'auth/email-already-in-use':
        return 'Otro usuario ya está utilizando el correo electrónico indicado';
      case 'auth/invalid-email':
        return "El formato del correo electrónico no es correcto";
      case 'auth/invalid-password':
        return "El valor que se proporcionó para la contraseña no es válido. Debe contener al menos seis caracteres";
      case 'auth/invalid-phone-number':
      return "El valor que se proporcionó para el número de celular no es válido. Debe no estar vacío y que cumpla con el estándar E.164";
      case 'auth/wrong-password':
      return 'Contraseña incorrecta';
    }
    return '';
  }
}


