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
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'apps-outline' },
    { title: 'Profile', url: '/profile', icon: 'person-outline' },
    { title: 'Patient List', url: '/patientlist', icon: 'list-outline' },
    { title: 'Add Patient', url: '/addpatient', icon: 'person-add-outline' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private commonService: CommonService, private navCtrl: NavController, private menu: MenuController, private firestore: AngularFirestore) {}

  ngOnInit(){
    console.log(this.firestore, 'firestore');
    this.getUserData = this.commonService.getLoggedInUserData();
    if(this.getUserData && this.getUserData.id){
      this.navCtrl.navigateRoot('/dashboard');
    }else {
      this.menu.enable(false);
    }
  }
  ngDoCheck(){
    this.getUserData = this.commonService.getLoggedInUserData();
  }

  logout(){
    sessionStorage.removeItem('userData');
    this.menu.close();
    this.navCtrl.navigateRoot('/login');
  }
}
