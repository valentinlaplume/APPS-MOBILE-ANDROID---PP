import { Injectable } from '@angular/core';

import { Usuario } from "../shared/usuario.interface";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/compat/firestore';

import  {  Observable ,  of   } from  'rxjs' ;
import  { switchMap   } from  'rxjs/operators' ;
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<Usuario>;

  constructor(
    public afAuth: AngularFireAuth, 
    private afs: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<Usuario>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
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

  async register(email: string, password: string): Promise<Usuario> {
    try {
      //destructuro user a mi user
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerifcationEmail();
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async loginGoogle(): Promise<Usuario> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async login(email: string, password: string): Promise<Usuario> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    } catch (error) { 
      console.log('Error->', error);
    }
  }

  async logout():Promise<void>{
    try {
      await this.afAuth.signOut();
    } 
    catch (error) {
      console.log('error ->', error);
    }
  }

  private updateUserData(user: Usuario) {
    const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`users/${user.uid}`);
    console.log('userRef ->', userRef);
    
    const data: Usuario = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };

    return userRef.set(data, { merge: true });
  }

  isEmailVerified(user: Usuario):boolean{
    return user.emailVerified === true ? true : false;
  }
}


