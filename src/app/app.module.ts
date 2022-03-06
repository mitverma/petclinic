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
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DashboardGateComponent } from './gatepass/dashboard-gate/dashboard-gate.component';
import { GeneratepassComponent } from './gatepass/generatepass/generatepass.component';
import { UsersComponent } from './gatepass/users/users.component';
import { ViewpassComponent } from './gatepass/viewpass/viewpass.component';



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

// const firebaseConfig = {
//   apiKey: "AIzaSyBXa-mglkv5KGwBhH8rsKW6oQ97FH_1Kj4",
//   authDomain: "gatepass-2861e.firebaseapp.com",
//   projectId: "gatepass-2861e",
//   databaseURL: "https://gatepass-2861e-default-rtdb.firebaseio.com",
//   storageBucket: "gatepass-2861e.appspot.com",
//   messagingSenderId: "339009319191",
//   appId: "1:339009319191:web:a11a92bc2c47325c3d0752",
//   measurementId: "G-BDQZEGHJEX" 
// };

const firebaseConfig = {
  apiKey: "AIzaSyBRrh3iPu7K9mdGAlt0g3d5g3a4ccUuPXo",
  authDomain: "gatepass-a3fd5.firebaseapp.com",
  projectId: "gatepass-a3fd5",
  databaseURL: "https://gatepass-a3fd5-default-rtdb.firebaseio.com",
  storageBucket: "gatepass-a3fd5.appspot.com",
  messagingSenderId: "327639656417",
  appId: "1:327639656417:web:40e751599cba62169614a0",
  measurementId: "G-5MKYS43MQF"
};


@NgModule({
  declarations: [AppComponent, DashboardGateComponent, GeneratepassComponent, UsersComponent, ViewpassComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule,AngularFireDatabaseModule,AngularFireStorageModule,AngularFireModule.initializeApp(firebaseConfig)],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    SocialSharing,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
