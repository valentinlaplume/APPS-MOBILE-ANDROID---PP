import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,  } from '@angular/fire/compat/database';
import { ChatMensaje } from '../shared/chat-mensaje';
import { 
  AngularFirestore,
  AngularFirestoreCollection 
} from '@angular/fire/compat/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService 
{
  private dbPathA: string = 'chatMensajesA';
  private dbPathB: string = 'chatMensajesB';
  
  mensajesCollectionA!: AngularFirestoreCollection<ChatMensaje>;
  mensajesCollectionB!: AngularFirestoreCollection<ChatMensaje>;
  mensajes!: Observable<ChatMensaje[]>;

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore) 
  {
    this.mensajesCollectionA = firestore.collection<ChatMensaje>(this.dbPathA, ref => ref.orderBy('fecha','asc'));
    this.mensajesCollectionB = firestore.collection<ChatMensaje>(this.dbPathB, ref => ref.orderBy('fecha','asc'));
  }

  getMensajesA() {
    this.mensajes = this.mensajesCollectionA.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as ChatMensaje))
    );
    
    return this.mensajes;
  }

  getMensajesB() {
    this.mensajes = this.mensajesCollectionB.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as ChatMensaje))
    );
    
    return this.mensajes;
  }


  async saveMensaje(item: ChatMensaje, mensajesCollection:AngularFirestoreCollection<ChatMensaje>){
    return await mensajesCollection.add(
    {
      emailUsuario: item.emailUsuario,
      idUsuario: item.idUsuario,
      fecha: item.fecha,
      mensaje: item.mensaje
    });
  }

  
}
