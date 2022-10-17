import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//agregados
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

// Para utilizar todocos los servicios de autenticacion
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Modulo de la base de datos
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
