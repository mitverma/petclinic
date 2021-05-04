import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  openPage(pageRoute){
    this.navCtrl.navigateForward(pageRoute);
  }

}
