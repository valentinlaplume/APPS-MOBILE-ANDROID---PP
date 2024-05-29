import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { PhotoService } from "../services/photo.service";
import { Foto } from '../shared/foto';
import { AudioService } from '../services/audio.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit, OnDestroy {
  @ViewChild('content', { static: false }) content: IonContent;

  suscripciones: Subscription[] = [];
  listaCosasLindas: Array<any> = new Array<any>();
  muestroSpinner: boolean = false;

  constructor(
    public router: Router,
    public authService: AuthService,
    public photoService: PhotoService,
    private audioService: AudioService
  ) {
    this.spinnerHide();
    this.cargarLista();
  }

  spinnerShow() {
    this.muestroSpinner = true;
  }

  spinnerHide() {
    this.muestroSpinner = false;
  }

  async cargarLista() {
    this.spinnerShow();
    this.listaCosasLindas = [];
    this.suscripciones.push(
      this.photoService.getCosasLindas().subscribe((res: any) => {
        this.listaCosasLindas = res;
        console.log(this.listaCosasLindas);
        this.spinnerHide();
      })
    );
  }

  ngOnDestroy(): void {
    this.suscripciones.forEach((observable) => {
      observable.unsubscribe();
      console.log('unsubscribe CosasLindasPage ->', this.suscripciones.length);
    });
  }

  ngOnInit() {}

  onVolver() {
    // this.ngOnDestroy();
    this.audioService.onAudio(this.audioService.volver);
    this.router.navigateByUrl('home');
  }

  addPhotoToGallery() {
    this.spinnerShow();
    this.photoService
      .addNewToGallery(this.photoService.dbPathCosasLindas)
      .then((item) => {
        setTimeout(() => { this.content.scrollToTop(1500); }, 3000);
        this.spinnerHide();
        console.log('addPhotoToGallery item -> ', item);
      })
      .catch((err) => {
        this.spinnerHide();
        console.error(err);
      });
  }

  votar(foto: any, like: boolean) {
    if (like) {
      foto.likes.push(this.authService.emailUser);
    } else {
      foto.likes = foto.likes.filter(
        (like: string) => like != this.authService.emailUser
      );
    }

    console.log(foto);
    console.log(foto.id);
    this.photoService.update(foto, 'cosasLindas').then((e) => {
      console.log(e);
    });
  }
}
