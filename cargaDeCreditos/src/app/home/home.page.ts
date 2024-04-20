import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { CreditosService } from '../services/creditos.service';
import { ScannerService } from "../services/scanner.service";
import { Subscription } from 'rxjs';
import { Credito } from '../shared/credito';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  errorMsj:string;//'CÓDIGO YA UTILIZADO 2 VECES';
  creditoLeido:number=0;
  public usuario$: Observable<any> = this.authService.afAuth.user;
  qrLeido:string='';

  idUserLog:string;
  qr10 : string = '8c95def646b6127282ed50454b73240300dccabc';
  qr50 : string = 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172';
  qr100 : string = '2786f4877b9091dcad7f35751bfcf5d5ea712b2f';
  
  listaCreditos: Array<any> = new Array<any>();
  suscripciones:Subscription[] = [];
  muestroSpinner:boolean = false;
  creditoUserLog:Credito= new Credito();

  constructor(
    private router:Router,
    public authService:AuthService,
    private scannerService:ScannerService,
    private creditosService:CreditosService,
    ) {

      this.spinnerShow();
  }

  spinnerShow(){
    this.muestroSpinner = true;
  }

  spinnerHide(){
    this.muestroSpinner = false;
  }

  setearCreditoUserLog(){
    this.creditoUserLog = new Credito();
    this.creditoUserLog.id = '';
    this.creditoUserLog.idUser = '';
    this.creditoUserLog.qr10= 0;
    this.creditoUserLog.qr50= 0;
    this.creditoUserLog.qr100= 0;
    this.creditoUserLog.creditos= 0;
  }

  async cargarLista(){
    try{

      this.suscripciones.push(
        this.creditosService.getAll().subscribe((res:any) => {
      this.listaCreditos = res;
      console.log('sin filtrar', this.listaCreditos);

      this.listaCreditos = this.listaCreditos.filter((e) => {
        console.log('credito: ', e)
        return e.idUser == this.idUserLog;
      });
      console.log('filtrada: ', this.listaCreditos)
      this.creditoUserLog = this.listaCreditos[0];//.length == 0 ? new Credito() : this.listaCreditos[0] ;
      console.log('creditoUserLog: ', this.creditoUserLog)
      this.spinnerHide();
     }));
    }catch(err){
      this.spinnerHide();
      alert(err)
    }
  }

  ngOnInit() {
    this.setearErrorMsj('');

    this.listaCreditos = [];
    this.usuario$.subscribe(e => {
      this.idUserLog = e.uid;
      console.log('id User Log : ', this.idUserLog )
      this.cargarLista();
      
    })

  }
  ngOnDestroy() {
    this.setearCreditoUserLog();
    this.authService.emailUser = '';
    console.log('ngOnDestroy')
    this.setearErrorMsj('');
    this.suscripciones.forEach(observable =>{
      observable.unsubscribe();
      console.log('unsubscribe home ->', this.suscripciones.length);
    })
  }

  async signOff():Promise<void>{
    try {
      this.authService.logout()
      .then(e => {
        this.ngOnDestroy();
        this.router.navigateByUrl('login');
      })
    } catch (error) {
      console.log('Error->', error);
    }
  }

  scan(){
    this.setearErrorMsj('');
    this.spinnerShow();
    console.log('scan on', );
    this.scannerService.test()
    .then(e => {
      this.qrLeido = e;
      console.log('scan then', );
      console.log('tendria que ser qr leido: ', e);
      let creditoLeido = this.getCreditoQrLeido();
      if(creditoLeido > 0){
        if(this.creditoUserLog == undefined)
        {
          this.createCredito(creditoLeido);
        }else
        {
          this.saveCreditoValidado(creditoLeido).then(e => {
            console.log(e)
          });
        }
      }
      this.spinnerHide();
    })
    .catch(err => {console.error(err)
      this.spinnerHide();})
    //this.simularScan();
  }

  simularScan(){
    console.log('simularScan');
    this.qrLeido = this.qr50;
    setTimeout(() => {
      let creditoLeido = this.getCreditoQrLeido();
      if(creditoLeido > 0){
        if(this.creditoUserLog == undefined){
          console.log('createCredito')
          this.createCredito(creditoLeido);
        }else{
          console.log('saveCreditoValidado')
          this.saveCreditoValidado(creditoLeido).then(e => {
            console.log(e)
          });
        }

      }
      
    }, 2000);
  }

  saveCreditoValidado(creditoLeido:number):Promise<any>{
    let emailUser = this.authService.emailUser;
    let update = false;
    switch (emailUser) {
      case 'admin@admin.com':
        if(this.creditoUserLog != undefined && 
          this.creditoUserLog.qr10 < 2 && creditoLeido == 10){
          this.creditoUserLog.qr10++;
          this.creditoUserLog.creditos+=10;
          update = true;
        }
        else if(this.creditoUserLog != undefined &&
          this.creditoUserLog.qr50 < 2 && creditoLeido == 50){
          this.creditoUserLog.qr50++;
          this.creditoUserLog.creditos+=50;
          update = true;
        }
        else if(this.creditoUserLog != undefined &&
          this.creditoUserLog.qr100 < 2 && creditoLeido == 100){
          this.creditoUserLog.qr100++;
          this.creditoUserLog.creditos+=100;
          update = true;
        }
        else{
          this.setearErrorMsj('CRÉDITO UTILIZADO (MAX 2))')
        }
      break;
      default:
        if(this.creditoUserLog != undefined &&
          this.creditoUserLog.qr10 == 0 && creditoLeido == 10){
          this.creditoUserLog.qr10++;
          this.creditoUserLog.creditos+=10;
          update = true;
        }
        else if(this.creditoUserLog != undefined &&
          this.creditoUserLog.qr50 == 0 && creditoLeido == 50){
          this.creditoUserLog.qr50++;
          this.creditoUserLog.creditos+=50;
          update = true;
        }
        else if(this.creditoUserLog != undefined &&
          this.creditoUserLog.qr100 == 0 && creditoLeido == 100){
          this.creditoUserLog.qr100++;
          this.creditoUserLog.creditos+=100;
          update = true;
        }
        else{
          this.setearErrorMsj('CRÉDITO YA UTILIZADO')
        }
      break;
    }
    if(this.creditoUserLog != undefined && update){
      return this.creditosService.updateInfoCreditos(this.creditoUserLog);
    }
  }

  createCredito(creditoLeido:number){
    this.creditoUserLog = new Credito();
    console.log('createCredito creditoLeido', creditoLeido)
    let emailUser = this.authService.emailUser;
    let save = false;
    console.log('createCredito emailUser', emailUser)

    switch (emailUser) {
      case 'admin@admin.com':
        if(creditoLeido == 10){
          this.creditoUserLog.qr10=1;
          this.creditoUserLog.qr50=0;
          this.creditoUserLog.qr100=0;
          this.creditoUserLog.creditos=10;
          save = true;
        }
        else if(creditoLeido == 50){
          this.creditoUserLog.qr10=0;
          this.creditoUserLog.qr50=1;
          this.creditoUserLog.qr100=0;
          this.creditoUserLog.creditos=50;
          save = true;
        }
        else if(creditoLeido == 100){
          this.creditoUserLog.qr10=0;
          this.creditoUserLog.qr50=0;
          this.creditoUserLog.qr100=1;
          this.creditoUserLog.creditos=100;
          save = true;
        }
        else{
          this.setearErrorMsj('CRÉDITO YA UTILIZADO (MAX 2)')
        }
      break;
      default:
        if(creditoLeido == 10){
          this.creditoUserLog.qr10=1;
          this.creditoUserLog.qr50=0;
          this.creditoUserLog.qr100=0;
          this.creditoUserLog.creditos=10;
          save = true;
        }
        else if(creditoLeido == 50){
          this.creditoUserLog.qr10=0;
          this.creditoUserLog.qr50=1;
          this.creditoUserLog.qr100=0;
          this.creditoUserLog.creditos=50;
          save = true;
        }
        else if(creditoLeido == 100){
          this.creditoUserLog.qr10=0;
          this.creditoUserLog.qr50=0;
          this.creditoUserLog.qr100=1;
          this.creditoUserLog.creditos=100;
          save = true;
        }
        else{
          this.setearErrorMsj('CRÉDITO YA UTILIZADO')
        }
      break;
    }
    console.log('save ->', save)
    console.log('undefined user ->', this.creditoUserLog == undefined)
    if(save){
      this.creditoUserLog.idUser = this.idUserLog;
      this.creditosService.create(this.creditoUserLog);
    }
  }

  getCreditoQrLeido():number{
    switch (this.qrLeido) {
      case this.qr10:
        return 10;
      break;
      case this.qr50:
        return 50;
      break;
      case this.qr100:
        return 100;
      break;
    }
  }

  setearErrorMsj(msj)
  { 
    this.errorMsj = msj;
  }

  limpiarCreditosDB(){
    this.creditoLeido = 0;
    this.creditoUserLog.idUser = this.idUserLog;
    this.creditoUserLog.qr10= 0;
    this.creditoUserLog.qr50= 0;
    this.creditoUserLog.qr100= 0;
    this.creditoUserLog.creditos= 0;
    this.creditosService.updateInfoCreditos(this.creditoUserLog);
  }

}
