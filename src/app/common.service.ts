import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userData: any;
  constructor(public toastController: ToastController) {
  }

  getLocalDatabase(){
    return JSON.parse(localStorage.getItem('petData'));
  }

  setLocalDatabase(data){
    localStorage.setItem('petData', JSON.stringify(data));
  }

  insertUser(data){
    let getLocalDatabase = this.getLocalDatabase();
    if(getLocalDatabase && getLocalDatabase.users && getLocalDatabase.users.length){
      getLocalDatabase.users.push(data);
    }else {
      getLocalDatabase = {
        users : []
      }
      getLocalDatabase.users.push(data);
    }
    this.setLocalDatabase(getLocalDatabase);

  }

  insertPatient(data){
    let getLocalDatabase = this.getLocalDatabase();
    if(getLocalDatabase && getLocalDatabase.patientsList && getLocalDatabase.patientsList.length){
      getLocalDatabase.patientsList.push(data);
    }else {
      getLocalDatabase.patientsList = [];
      getLocalDatabase.patientsList.push(data);
    }
    this.setLocalDatabase(getLocalDatabase);
  }

  generateRandomString(){
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
  }

  getTodaysDate(){
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth()+1) + '/'+ today.getFullYear();
    return date;
  }

  getLoggedInUserData(){
    return JSON.parse(sessionStorage.getItem('userData'));
  }

  setUserData(userDetailData){
    sessionStorage.setItem('userData', JSON.stringify(userDetailData));
    this.userData = userDetailData;
  }

 
  async toastMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


}

