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


const firebaseConfig = {
  apiKey: "AIzaSyBXa-mglkv5KGwBhH8rsKW6oQ97FH_1Kj4",
  authDomain: "gatepass-2861e.firebaseapp.com",
  projectId: "gatepass-2861e",
  databaseURL: "https://gatepass-2861e-default-rtdb.firebaseio.com",
  storageBucket: "gatepass-2861e.appspot.com",
  messagingSenderId: "339009319191",
  appId: "1:339009319191:web:a11a92bc2c47325c3d0752",
  measurementId: "G-BDQZEGHJEX" 
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
