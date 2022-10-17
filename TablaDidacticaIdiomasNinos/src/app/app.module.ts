import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Agregados
import { AngularFireModule } from "@angular/fire/compat";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { environment } from 'src/environments/environment';

import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
    NativeAudio,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent], 
})
export class AppModule {}
