import { Component } from '@angular/core';
import { CommonService } from './common.service';
import { NavController, MenuController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  getUserData: any;
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private commonService: CommonService, private navCtrl: NavController, private menu: MenuController, private firestore: AngularFirestore) {}

  ngOnInit(){

  }

}
