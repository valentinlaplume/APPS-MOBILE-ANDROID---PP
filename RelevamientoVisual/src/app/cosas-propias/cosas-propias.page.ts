import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { PhotoService } from "../services/photo.service";
import { Foto } from '../shared/foto';
import { AudioService } from '../services/audio.service';
import { IonContent } from '@ionic/angular';
@Component({
  selector: 'app-cosas-propias',
  templateUrl: './cosas-propias.page.html',
  styleUrls: ['./cosas-propias.page.scss'],
})
export class CosasPropiasPage implements OnInit {
  @ViewChild('content', { static: false }) content: IonContent;

  suscripciones: Subscription[] = [];
  listaCosasLindasPropias: Array<any> = new Array<any>();
  listaCosasFeasPropias: Array<any> = new Array<any>();
  listaCosasPropias: Array<any> = new Array<any>();
  muestroSpinner: boolean = false;

  constructor(
    public router: Router,
    public authService: AuthService,
    public photoService: PhotoService,
    private audioService: AudioService
  ) {
    this.muestroSpinner = false;
    this.listaCosasLindasPropias = [];
    this.listaCosasFeasPropias = [];
    this.listaCosasPropias = [];
    this.cargarListas();
  }

  async cargarListas() {
    this.muestroSpinner = true;
    this.suscripciones.push(
      this.photoService.getCosasLindas().subscribe((res: any) => {
        this.listaCosasLindasPropias = res;
        this.listaCosasLindasPropias = this.listaCosasLindasPropias.filter(
          (e) => {
            console.log(e.emailUsuario);
            return e.emailUsuario == this.authService.emailUser;
          }
        );
        this.listaCosasLindasPropias.forEach((item) =>
          this.listaCosasPropias.push(item)
        );
      })
    );

    this.suscripciones.push(
      this.photoService.getCosasFeas().subscribe((res: any) => {
        this.listaCosasFeasPropias = res;
        this.listaCosasFeasPropias = this.listaCosasFeasPropias.filter((e) => {
          return e.emailUsuario == this.authService.emailUser;
        });
        this.listaCosasFeasPropias.forEach((item) =>
          this.listaCosasPropias.push(item)
        );
        console.log(this.listaCosasPropias);
        this.muestroSpinner = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.suscripciones.forEach((observable) => {
      observable.unsubscribe();
      console.log('unsubscribe CosasPropiasPage ->', this.suscripciones.length);
    });
  }

  ngOnInit() {}

  onVolver() {
    this.audioService.onAudio(this.audioService.volver);
    //this.ngOnDestroy();
    this.router.navigateByUrl('home');
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
    this.photoService.update(foto, 'cosasPropias').then((e) => {
      console.log(e);
    });
  }
}
