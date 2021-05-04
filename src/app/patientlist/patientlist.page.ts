import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.page.html',
  styleUrls: ['./patientlist.page.scss'],
})
export class PatientlistPage implements OnInit {
  patientList: any;
  searchItem: any;
  filteredPatientList = [];
  constructor(private commonService: CommonService, private navCtrl: NavController, private firestore: AngularFirestore) {
  }

  ngOnInit() {
    let jsonLocalData = this.commonService.getLocalDatabase();
    // if(jsonLocalData && jsonLocalData.patientsList){
    //   this.patientList = jsonLocalData.patientsList
    //   this.filteredPatientList = jsonLocalData.patientsList;
    // }

    this.firestore.collection('patientsList').snapshotChanges().subscribe(data => {
      if(data){
        this.patientList = data.map(list => {
          let listValue = {};
          listValue = list.payload.doc.data();
          listValue['fireBaseId'] = list.payload.doc.id;
          return listValue;
        });
        this.filteredPatientList = this.patientList;
        console.log(this.patientList, 'list');
      }
    });
  }

  filterData(event){
    console.log(event, 'event');    
    this.filteredPatientList = this.patientList.filter(list => {
      if(event.target.value){
        console.log(list.ownerName.toLowerCase().indexOf(event.target.value.toLowerCase()), 'value', list);
        // return list.ownerName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
        if(list.ownerName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1){
          return list.ownerName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
        }else if(list.contactNo.toString().toLowerCase().indexOf(event.target.value.toLowerCase()) > -1){
          return list.contactNo.toString().toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
        }
        // return Object.keys(list).map(key => {
        //   if(typeof(list[key]) == 'string'){
        //     console.log(key, 'key',list[key],  list[key].toLowerCase().indexOf(event.target.value));
        //     return list[key].toLowerCase().indexOf(event.target.value) > -1; 
        //   }
        // })
      }else {
        return true;
      }
      
    });
    console.log(this.filteredPatientList, 'filtered');
  }

  viewPatientDetails(list){
    let navigationExtras: NavigationExtras = {
      queryParams: list
  };
    this.navCtrl.navigateForward('/patientdetail', navigationExtras);
  }

}
