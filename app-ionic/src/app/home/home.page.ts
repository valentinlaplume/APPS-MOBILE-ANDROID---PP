import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import  {  Observable    } from  'rxjs' ;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuario$: Observable<any> = this.authSvc.afAuth.user;

  constructor(
    public authSvc: AuthService, 
    private router: Router
  ) {
    // this.authSvc.user$.pipe(take(1), map((user) => {
    //   console.log('usuario: ', user);
    //   console.log("hola");
    //   this.user = user;
    // }));
  }

  ngOnInit() {

  }

  async signOff():Promise<void>{
    try {
      this.onSonidoIngresoVolver();
      console.log(this.authSvc.logout());
      this.router.navigate(['../login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  onSonidoIngresoVolver(){
    let audio = new Audio();
    audio.src = '../../assets/sonidos/volver.mp3';
    audio.load();
    audio.play();
  }

  onSonidoIngreso(){
    let audio = new Audio();
    audio.src = '../../assets/sonidos/on.mp3';
    audio.load();
    audio.play();
  }

  onChatAulaA(){
    this.onSonidoIngreso();
    this.router.navigate(['../chatAulaA']);
  }

  onChatAulaB(){
    this.onSonidoIngreso();
    this.router.navigate(['../chatAulaB']);
  }

}
