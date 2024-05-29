import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private router: Router,
    private authService: AuthService,
    private audioService: AudioService
  ) {}

  async signOff(): Promise<void> {
    try {
      this.authService.logout().then((e) => {
        this.audioService.onAudio(this.audioService.volver);
        this.router.navigate(['../login']);
      });
    } catch (error) {
      console.log('Error->', error);
    }
  }

  onCosasLindas() {
    this.audioService.onAudio(this.audioService.enviar);
    // this.srvPhoto.leerDBCosasLindas();
    this.router.navigateByUrl('cosas-lindas');
  }

  onCosasFeas() {
    this.audioService.onAudio(this.audioService.enviar);
    // this.srvPhoto.leerDBCosasFeas();
    this.router.navigateByUrl('cosas-feas');
  }

  onGraficos() {
    this.audioService.onAudio(this.audioService.enviar);
    // this.srvPhoto.leerDBCosasFeas();
    this.router.navigateByUrl('graficos');
  }

  onGraficosCosasLindas() {
    this.audioService.onAudio(this.audioService.enviar);
    // this.srvPhoto.leerDBCosasFeas();
    this.router.navigateByUrl('graficos-cosas-lindas');
  }

  onCosasPropias() {
    this.audioService.onAudio(this.audioService.enviar);
    // this.srvPhoto.leerDBCosasFeas();
    this.router.navigateByUrl('cosas-propias');
  }
}
