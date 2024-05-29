import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { PhotoService } from "../services/photo.service";
import { Foto } from '../shared/foto';
import { AudioService } from '../services/audio.service';
import { IonContent } from '@ionic/angular';
@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {
  suscripciones: Subscription[] = [];
  listaCosasFeas: Array<any> = new Array<any>();
  muestroSpinner: boolean = false;
  @ViewChild('content', { static: false }) content: IonContent;

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
    this.listaCosasFeas = [];
    this.suscripciones.push(
      this.photoService.getCosasFeas().subscribe((res: any) => {
        this.listaCosasFeas = res;
        console.log(this.listaCosasFeas);
        this.spinnerHide();
      })
    );
  }

  ngOnDestroy(): void {
    this.suscripciones.forEach((observable) => {
      observable.unsubscribe();
      console.log('unsubscribe CosasFeasPage ->', this.suscripciones.length);
    });
  }

  ngOnInit() {}

  onVolver() {
    this.audioService.onAudio(this.audioService.volver);
    // this.ngOnDestroy();
    // this.router.navigate(['/home']);
    this.router.navigateByUrl('home');
  }

  addPhotoToGallery() {
    this.spinnerShow();
    this.photoService
      .addNewToGallery(this.photoService.dbPathCosasFeas)
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
    this.photoService.update(foto, 'cosasFeas').then((e) => {
      console.log(e);
    });
  }
}
