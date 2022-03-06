import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-gate',
  templateUrl: './dashboard-gate.component.html',
  styleUrls: ['./dashboard-gate.component.scss'],
})
export class DashboardGateComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  openPage(pageRoute){
    this.navCtrl.navigateForward(pageRoute);
  }

}
