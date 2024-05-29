import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { ChatService } from './../services/chat-service.service';
import { Router } from '@angular/router';
import { ChatMensaje } from 'src/app/shared/chat-mensaje';
import {  Observable, Subscription } from 'rxjs';
import { IonContent } from '@ionic/angular';
@Component({
  selector: 'app-chat-aula-a',
  templateUrl: './chat-aula-a.page.html',
  styleUrls: ['./chat-aula-a.page.scss'],
})
export class ChatAulaAPage implements OnInit, OnDestroy 
{
  @ViewChild('content', { static: false }) content: IonContent;
  
  dummyList: any;
  public msjEnviar!: string;
  public msjCantCaracteres:number;

  mailUsuarioLogeado!: string;
  idUsuarioLogeado!: string;
  listaMensajes: Array<any> = new Array<any>();
  usuario$: Observable<any> = this.authSvc.afAuth.user;
  suscripciones!:Subscription[];

  constructor(
    public authSvc: AuthService, 
    private chatSvc: ChatService, 
    private router: Router
  ) {
    this.msjEnviar = '';
    this.suscripciones = [];
    this.usuario$.subscribe(res => {
      this.mailUsuarioLogeado = res['email'];
      this.idUsuarioLogeado = res['uid'];
    });
    this.cargarMensajes();

  }

  ngOnInit() {
    setTimeout(() => {
      this.content.scrollToBottom(1500);
    }, 1000);
  }
  
  ngOnDestroy(): void {
    this.suscripciones.forEach(observable =>{
      observable.unsubscribe();
    })
    console.log('ngOnDestroy ChatAulaA');
  }

  async cargarMensajes(){
    this.listaMensajes = [];
    this.suscripciones.push(this.chatSvc.getMensajesA().subscribe((res:any) => {
      this.listaMensajes = res;
      console.log(this.listaMensajes);
    }));
  }

  enviarMensaje(){
    if(this.msjEnviar == '') return;
    this.msjCantCaracteres = this.msjEnviar.length;
    let msj = new ChatMensaje();

    msj.idUsuario = this.idUsuarioLogeado;
    msj.emailUsuario = this.mailUsuarioLogeado;
    msj.fecha = new Date().toLocaleString();
    msj.mensaje = this.msjEnviar;

    // msj.hora = new Date().toLocaleTimeString();
    // this.chatSvc.addMensaje(msj);
    let audio = new Audio();
    audio.src = '../../assets/sonidos/enviar.ogg';
    audio.load();
    audio.play();
    console.log('mensaje a guardar en db: ', msj);
    this.chatSvc.saveMensaje(msj, this.chatSvc.mensajesCollectionA).then(e => {
      this.msjEnviar = "";
      this.msjCantCaracteres = 0;
      this.content.scrollToBottom(1500);
    })
  }

  onSonidoIngresoVolver(){
    let audio = new Audio();
    audio.src = '../../assets/sonidos/volver.mp3';
    audio.load();
    audio.play();
  }
  scrollBottom(){
    this.content.scrollToBottom(1500);
  }

  async signOff():Promise<void>{
    try {
      console.log(this.authSvc.logout());
      this.router.navigate(['../login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  inputUp()
  {
    this.msjCantCaracteres = this.msjEnviar.length;
    console.log('msjCantCaracteres ', this.msjCantCaracteres)
    console.log('inputUp ', this.msjEnviar)
  }
  inputDown(){
    this.msjCantCaracteres = this.msjEnviar.length;
    console.log('msjCantCaracteres ', this.msjCantCaracteres)
    console.log('inputDown ', this.msjEnviar)
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  volver(){
    let audio = new Audio();
    audio.src = '../../assets/sonidos/volver.mp3';
    audio.load();
    audio.play();
    this.ngOnDestroy();
    this.router.navigate(['../home']);
  }

  onActivate(event:any){
    console.log(event);
  }

  doSomethingOnScroll(event:any){
    console.log(event);
    event['detail']['deltaY'] = 265;
    
  }

  


}
