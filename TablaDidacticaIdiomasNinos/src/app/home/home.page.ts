import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public colores: boolean = false;

  public idiomaSrc: string = '../assets/españa.png';
  public idioma: string = 'es';
  public temaSrc: string = '🟨';
  public tema: string = 'col';

  constructor(private authSvc: AuthService, private router: Router) {}

  onIdioma(idioma: string, event: MouseEvent) {
    this.idioma = idioma;
    this.idiomaSrc = this.getIdiomaSrc(this.idioma);
  }


  onTema(opcion: string) {
    if (opcion != '') 
    {
      this.tema = opcion;
      this.temaSrc = this.getTemaSrc(this.tema);
    }
  }

  logOut() {
    this.authSvc.logout().then((e) => {
      let audio = new Audio();
      audio.src = '../../assets/sonidos/volver.mp3';
      audio.load();
      audio.play();
      this.router.navigate(['../login']);
    });
  }

  playColor(color: string) {
    this.escuchar('colores', color);
  }

  playAnimal(animal: string) {
    this.escuchar('animales', animal);
  }

  playNumero(numero: string) {
    this.escuchar('numeros', numero);
  }

  private escuchar(carpeta: string, nombre: String) {
    if (this.idioma != '' && this.tema != '') {
      let nombreAudio = this.idioma + '-' + nombre;
      let audio = new Audio();
      audio.src = '../assets/audios/' + carpeta + '/' + nombreAudio + '.ogg';
      audio.load();
      audio.play();
    }
  }

  private getIdiomaSrc(idioma: string) {
    switch (idioma) {
      case 'es':
        return (this.idiomaSrc = '../assets/españa.png');
        break;
      case 'br':
        return (this.idiomaSrc = '../assets/brasil.png');
        break;
      case 'eu':
        return (this.idiomaSrc = '../assets/eeuu.png');
        break;
    }
  }

  private getTemaSrc(tema: string) {
    switch (tema) {
      case 'ani':
        return (this.temaSrc = '🐵​');
        break;
      case 'col':
        return (this.temaSrc = '🟨');
        break;
      case 'num':
        return (this.temaSrc = '1️⃣');
        break;
    }
  }
}
