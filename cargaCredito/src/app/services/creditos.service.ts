import { Injectable } from '@angular/core';
import { Credito } from '../shared/credito';
import { AngularFirestore, 
  AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { AuthService } from "../services/auth.service";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CreditosService {
  private colecctionCreditos!: AngularFirestoreCollection<Credito>;
  dbPath: string = "creditos";

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
    ) {
      this.colecctionCreditos = angularFirestore.collection<Credito>(this.dbPath, ref => ref.orderBy('creditos','desc'));
    }

  getAll() {
    return this.colecctionCreditos.snapshotChanges().pipe(
      map(actions => actions.map(item => 
        item.payload.doc.data() as Credito
      ))
    );
  }

  // async create(item:any) {
  //   item.id = '';
  //   console.log('item create ->', item);
  //   const refCreate = await this.angularFirestore.collection(this.dbPath).add(item);
  //   return await this.updateID(refCreate.id);
  // }

  async create(item:any) {
    const credito = {
      id: '',
      idUser: item.idUser,
      qr10:item.qr10,
      qr50:item.qr50,
      qr100:item.qr100,
      creditos:item.creditos
    }
    
    console.log('credito create ->', credito);
    const refCreate = await this.angularFirestore.collection(this.dbPath).add(credito);
    console.log('refCreate ->', refCreate)
    return await this.updateID(refCreate.id);
  }

  updateInfoCreditos(item:any)
  {
    const credito = {
      id: '',
      idUser: item.idUser,
      qr10:item.qr10,
      qr50:item.qr50,
      qr100:item.qr100,
      creditos:item.creditos
    }

    return this.angularFirestore.collection(this.dbPath).doc(item.id)
    .update({
      qr10:credito.qr10,
      qr50:credito.qr50,
      qr100:credito.qr100,
      creditos:credito.creditos,
    });
  }

  updateID(id:string)
  {
    return this.angularFirestore.collection(this.dbPath).doc(id).update({id:id});
  }

}