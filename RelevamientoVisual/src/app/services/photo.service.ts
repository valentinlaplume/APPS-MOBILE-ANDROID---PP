import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Foto } from '../shared/foto';


import { AngularFireStorage } from '@angular/fire/compat/storage';
import {  getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { AngularFirestore, 
  AngularFirestoreDocument,
  AngularFirestoreCollection  } from '@angular/fire/compat/firestore';

import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
import { uploadString } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  dbPathCosasLindas: string = 'cosasLindas';
  dbPathCosasFeas: string = 'cosasFeas';

  private collectionCosasLindas!: AngularFirestoreCollection<Foto>;
  private collectionCosasFeas!: AngularFirestoreCollection<Foto>;
  // listCosasLindas:any[] = [];

  constructor(
    public angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.collectionCosasLindas = angularFirestore.collection<Foto>(
      this.dbPathCosasLindas,
      (ref) => ref.orderBy('hora', 'desc')
    );
    this.collectionCosasFeas = angularFirestore.collection<Foto>(
      this.dbPathCosasFeas,
      (ref) => ref.orderBy('hora', 'desc')
    );
    // this.leerDBCosasLindas();
  }

  getCosasLindas() {
    return this.collectionCosasLindas.snapshotChanges().pipe(
      map((actions) => actions.map((item) => item.payload.doc.data() as Foto)),
      map((fotos) => {
        return fotos.sort((a, b) => {
          // Ordenar por fecha descendente
          const fechaA = this.parseFecha(a.fecha);
          const fechaB = this.parseFecha(b.fecha);
          if (fechaA > fechaB) return -1;
          if (fechaA < fechaB) return 1;

          // Si la fecha es la misma, ordenar por hora descendente
          const horaA = this.parseHora(a.hora);
          const horaB = this.parseHora(b.hora);
          if (horaA > horaB) return -1;
          if (horaA < horaB) return 1;

          return 0;
        });
      })
    );
  }

  getCosasFeas() {
    return this.collectionCosasFeas.snapshotChanges().pipe(
      map((actions) => actions.map((item) => item.payload.doc.data() as Foto)),
      map((fotos) => {
        return fotos.sort((a, b) => {
          // Ordenar por fecha descendente
          const fechaA = this.parseFecha(a.fecha);
          const fechaB = this.parseFecha(b.fecha);
          if (fechaA > fechaB) return -1;
          if (fechaA < fechaB) return 1;

          // Si la fecha es la misma, ordenar por hora descendente
          const horaA = this.parseHora(a.hora);
          const horaB = this.parseHora(b.hora);
          if (horaA > horaB) return -1;
          if (horaA < horaB) return 1;

          return 0;
        });
      })
    );
  }

  private parseFecha(fechaString: string): Date {
    const [dia, mes, año] = fechaString.split('/');
    return new Date(parseInt(año), parseInt(mes) - 1, parseInt(dia));
  }

  private parseHora(horaString: string): Date {
    const [hora, minutos, segundos, ampm] = horaString.split(/[:\s]/);
    let horas = parseInt(hora);
    if (ampm === 'p. m.') {
      horas += 12;
    }
    return new Date(2000, 0, 1, horas, parseInt(minutos), parseInt(segundos));
  }

  // getCosasLindas() {
  //   return this.collectionCosasLindas.snapshotChanges().pipe(
  //     map(actions => actions.map(item =>
  //       item.payload.doc.data() as Foto

  //     ))
  //   );
  // }

  // getCosasFeas() {
  //   return this.collectionCosasFeas.snapshotChanges().pipe(
  //     map(actions => actions.map(item =>
  //       item.payload.doc.data() as Foto
  //     ))
  //   );
  // }

  // getCosasLindas():any{
  //   this.collectionCosasLindas.snapshotChanges()
  //   .subscribe((snapshot:any) => {
  //     snapshot.forEach(item =>
  //     {
  //       let obj = item.payload.doc.data() as Foto;
  //       obj.id = item.payload.doc.id;
  //       this.listCosasLindas.push(obj);
  //     });
  //     console.log('this.listCosasLindas ->',this.listCosasLindas);
  //     return this.listCosasLindas;
  //   })
  // }

  formatearFecha(fecha: string): string {
    return fecha.replace('/', '');
  }

  formatearHora(hora: string): string {
    return hora.replace(':', '');
  }

  public async addNewToGallery(dbPath: string) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });

    console.log(capturedPhoto['dataUrl']);
    console.log(capturedPhoto);

    let fecha = new Date().toLocaleDateString();
    let hora = new Date().toLocaleTimeString();

    const item = {
      id: '',
      emailUsuario: this.authService.emailUser,
      fecha: fecha,
      hora: hora,
      likes: [],
      // foto: capturedPhoto,
      img_src: '',
      // filePath!: string;
      // webviewPath: capturedPhoto.webPath
    };

    console.log(item);

    return await this.uploadImageAndCreate(item, capturedPhoto, dbPath);
  }

  async uploadImageAndCreate(
    item: any,
    file: any,
    dbPath: string
  ): Promise<any> {
    console.log('uploadImageAndCreate');

    const storage = getStorage();

    let pathImg = dbPath + '/' + new Date().getTime() + '.png';
    // + dbPath
    // + '/' + item.emailUsuario
    // + '_' + item.fecha//this.formatearFecha(item.fecha)
    // + '_' + item.hora; //+ this.formatearHora();

    console.log(pathImg);

    const imgRef = ref(storage, pathImg);

    console.log('file.Uri ->', file['name']);
    const upload = await uploadString(imgRef, file['dataUrl'], 'data_url').then(
      (snapshot) => {
        getDownloadURL(imgRef)
          .then(async (url: string) => {
            item.img_src = url;
            await this.create(item, dbPath);
          })
          .catch((err) => console.error('uploadImageAndCreate error: ', err));
      }
    );

    return upload;
    // const upload = await uploadBytes(imgRef, file['dataUrl'])
    // .then(e => {
    //   getDownloadURL(e['ref'])
    //   .then(async (url:string) =>
    //   {
    //     item.img_src = url;
    //     return await this.create(item, dbPath);
    //   })
    //   .catch(err => console.error('uploadImageAndCreate error: ', err));
    // })
    // .catch(err => console.error(err));
  }

  async create(item: any, dbPath: string) {
    console.log('item create ->', item);
    const refCreate = await this.angularFirestore.collection(dbPath).add(item);
    return await this.updateID(refCreate.id, dbPath);
  }

  // update2(foto : any, dbPath:string)
  // {
  //   this.angularFirestore.collection(dbPath).
  //   let docRef = doc(dbPath, `${dbPath}/${foto.id}`);
  //   return updateDoc(docRef, foto);
  // }

  update(foto: any, dbPath: string) {
    return this.angularFirestore
      .collection(dbPath)
      .doc(foto.id)
      .update({ likes: foto.likes });
  }

  updateID(id: string, dbPath: string) {
    return this.angularFirestore.collection(dbPath).doc(id).update({ id: id });
  }

  // eliminar(id:string){
  //   return this.db.collection(this.path).doc(id).delete();
  // }

  // leerDBCosasLindas()
  // {
  //   console.log("-------------------------------------");
  //   console.log("COSAS LINDAS LEIDAS DE LA DB:")
  //   this.cosasLindasDB = [];

  //   //Obtengo los documentos de forma asincronica, con un await. Por cada documento creo un usuario le asigno los datos y lo guardo
  //   // let cosaslindas = collection(db, "cosaslindas");

  //   this.collectionCosasLindas.snapshotChanges().pipe(
  //     map(actions => actions.map(item => {
  //       const data = item.payload.doc.data() as Foto;
  //       data.id = item.payload.doc.id;
  //       this.cosasLindasDB.push(data);
  //     }))
  //   );
  // }
}
