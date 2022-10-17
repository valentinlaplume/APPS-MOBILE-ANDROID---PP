import { Injectable } from '@angular/core';
import { concat, forkJoin } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { concatMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private afs: AngularFirestore
    
  ) { }

  GetUsuarios(){
    return this.afs.collection<any>('usuarios').valueChanges();
  }
}
