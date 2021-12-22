import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
// import * as firebase from 'firebase';
// import {FirebaseModule, FirebaseProvider} from 'angular-firebase'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';



// const firebaseConfig = {
//   apiKey: "AIzaSyBXKwFRh1_K8NW24kwDCwKSkgpaBwA-GOU",
//   authDomain: "petclinic-ce690.firebaseapp.com",
//   databaseURL: "https://petclinic-ce690-default-rtdb.firebaseio.com",
//   projectId: "petclinic-ce690",
//   storageBucket: "petclinic-ce690.appspot.com",
//   messagingSenderId: "383997127906",
//   appId: "1:383997127906:web:439ccfb8ef997f8a7882bb",
//   measurementId: "G-HQ8D19S1NP"
// };


// afroam project credentials
  const firebaseConfig = {
    apiKey: "AIzaSyAgU-kOeTrsITDrky2imi_Tc57njCVIQTo",
    authDomain: "pet-clinic-afroam.firebaseapp.com",
    projectId: "pet-clinic-afroam",
    // databaseURL: "https://pet-clinic-afroam-default-rtdb.firebaseio.com",
    storageBucket: "pet-clinic-afroam.appspot.com",
    messagingSenderId: "1017808115743",
    appId: "1:1017808115743:web:399ce66d27f6cb15b9dd2a",
    measurementId: "G-XQY5MSFLQN"
  };


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule,AngularFireDatabaseModule,AngularFireModule.initializeApp(firebaseConfig)],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    SocialSharing,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
