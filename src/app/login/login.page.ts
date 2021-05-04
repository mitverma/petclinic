import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginView: boolean = true;
  jsonLocalDb: any;
  getUsers: any;
  constructor(private commonService: CommonService, private navCtrl: NavController, private firestore: AngularFirestore) {
    this.loginForm = new FormGroup({
      mobileNo: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.registerForm = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      registerMobileNo: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required]),
      registerPassword: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.jsonLocalDb = this.commonService.getLocalDatabase();
    this.firestore.collection('users').snapshotChanges().subscribe(data => {
      if(data){
        let listValue = {};
        this.getUsers = data.map(list => {
          listValue = list.payload.doc.data();
          listValue['fireBaseId'] = list.payload.doc.id
          return listValue;
        });

      }
      console.log(this.getUsers, 'get users');
    });
    console.log(this.jsonLocalDb, 'json local db');
  }

  submitLogin(formData){
    console.log(formData, 'formData');
    if(formData.valid){
      // if(this.jsonLocalDb && this.jsonLocalDb.users && this.jsonLocalDb.users.length){
      if(this.getUsers && this.getUsers.length){
        let isUserPresent = this.getUsers.find(list => list.mobileNo == formData.value.mobileNo && list.password == formData.value.password);
        if(isUserPresent){
          this.commonService.setUserData(isUserPresent);
          this.navCtrl.navigateRoot('/dashboard');
        }else {
          this.commonService.toastMessage('User not found. Please enter valid details');
        }
      }else {
        this.commonService.toastMessage('User not found. If new user please register');
      }
    }
    
  }

  toggleView(){
    this.isLoginView = !this.isLoginView;
  }

  register(registerForm){
    let userRegisteredData = {
      id: this.commonService.generateRandomString(),
      fullname: registerForm.value.fullname,
      emailId: registerForm.value.emailId,
      mobileNo: registerForm.value.registerMobileNo,
      password: registerForm.value.registerPassword,
      profilePic: null
  
    }
    console.log(registerForm.value, 'register');
    if(registerForm.valid){
      // if(this.jsonLocalDb && this.jsonLocalDb.users && this.jsonLocalDb.users.length){
      if(this.getUsers && this.getUsers.length){
        let isUserPresent = this.getUsers.find(list => list.mobileNo == registerForm.value.mobileNo);
        if(isUserPresent){
          console.log('user present');
          
        }else {
          this.firestore.collection('users').add(userRegisteredData).then(response => {
            console.log(response, 'response');
            userRegisteredData['fireBaseId'] = response.id;
            this.commonService.setUserData(userRegisteredData);
            this.navCtrl.navigateRoot('/dashboard');
          });

          // this.commonService.insertUser(userRegisteredData);
        }
      }else {
          this.firestore.collection('users').add(userRegisteredData).then((response) => {
            console.log(response, 'response');
            userRegisteredData['fireBaseId'] = response.id
            this.commonService.setUserData(userRegisteredData);
            this.navCtrl.navigateRoot('/dashboard');
          });

          // this.commonService.insertUser(userRegisteredData)
      }

    }
  }

}
