import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Foto } from '../shared/foto';


import { AngularFireStorage } from '@angular/fire/compat/storage';
import {  getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

import { uploadString } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  public error: string = 'error.ogg';
  public enviar: string = 'enviar.ogg';
  public on: string = 'on.mp3';
  public volver: string = 'volver.mp3';

  constructor() {}

  onAudio(nombre: string) {
    let audio = new Audio();
    audio.src = '../../assets/sonidos/' + nombre;
    audio.load();
    audio.play();
  }
}
