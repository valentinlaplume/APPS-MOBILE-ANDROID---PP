import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from './../services/audio.service';

@Component({
  selector: 'app-splash-estatico',
  templateUrl: './splash-estatico.page.html',
  styleUrls: ['./splash-estatico.page.scss'],
})
export class SplashEstaticoPage implements OnInit {
  constructor(
    public router: Router
    , private audioService: AudioService
  ) {}

  ngOnInit() {}

  onclick() {
    this.audioService.onAudio('volver.mp3');
    this.router.navigate(['splash-animado']);
  }
}
