import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.page.html',
  styleUrls: ['./addpatient.page.scss'],
})
export class AddpatientPage implements OnInit {
  patientDetail: FormGroup;
  jsonLocalDb: any;
  fileName: any;
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  patientsList: any = [];
  constructor(private commonService: CommonService, private actionSheetController :ActionSheetController, private camera: Camera, private navCtrl: NavController, private firestore: AngularFirestore) {
    this.patientDetail = new FormGroup({
      profilePic: new FormControl('', [Validators.required]),
      // profilePic: new FormControl('', []),
      ownerName: new FormControl('', [Validators.required]),
      contactNo: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required]),
      petName: new FormControl('', [Validators.required]),
      petBreedType: new FormControl('', [Validators.required]),
      medicinePrescription: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.jsonLocalDb = this.commonService.getLocalDatabase();
    // this.firestore.collection('patientsList').snapshotChanges().subscribe(data => {
    //   if(data){
    //     this.patientsList = data.map(list => list.payload.doc.data());
    //     console.log(this.patientsList, 'get users');
    //   }
    // });
    this.firestore.collection('patientsList').get().subscribe(data => {
      if(data){
        this.patientsList = data.docs.map(list => list.data());
        console.log(this.patientsList, 'get users');
      }
    });
  }

      // {
    //   id: 1,
    //   profilePic: null,
    //   ownerName: 'Amit Verma',
    //   contactNo: '8655568110',
    //   emailId: 'test@test.com',
    //   petName: 'Dobby',
    //   petBreedType: 'Husky',
    //   visitDetails: [
    //     {
    //       visitDate: '30/04/2021',
    //       medicinePrescription: 'Testing take health care'
    //     }
    //   ]
    // }

  addPatient(formData){
    // let insertPatientData = {
    //   id: this.commonService.generateRandomString(),
    //   profilePic: formData.value.profilePic,
    //   ownerName: formData.value.ownerName,
    //   contactNo: formData.value.contactNo,
    //   emailId: formData.value.emailId,
    //   petName: formData.value.petName,
    //   petBreedType: formData.value.petBreedType,
    //   visitDetails: [
    //     {
    //       visitDate: this.commonService.getTodaysDate(),
    //       medicinePrescription: formData.value.medicinePrescription
    //     }
    //   ]
    // }

     let insertPatientData = Object.assign({}, {
      id: this.commonService.generateRandomString(),
      profilePic: formData.value.profilePic,
      ownerName: formData.value.ownerName,
      contactNo: formData.value.contactNo,
      emailId: formData.value.emailId,
      petName: formData.value.petName,
      petBreedType: formData.value.petBreedType,
      visitDetails: [
        {
          visitDate: this.commonService.getTodaysDate(),
          medicinePrescription: formData.value.medicinePrescription
        }
      ]
    })

    if(formData.valid){
      // if(this.jsonLocalDb && this.jsonLocalDb.patientsList && this.jsonLocalDb.patientsList.length){
      if(this.patientsList && this.patientsList.length){
        let isPatientPresent = this.patientsList.find(list => list.contactNo == formData.value.contactNo);
        if(isPatientPresent){
          this.commonService.toastMessage('User already present');
        }else {
          this.firestore.collection('patientsList').add(insertPatientData).then(response => {
            this.navCtrl.navigateRoot('/dashboard');
          }, error => {
            console.log(error, 'error');
            this.commonService.toastMessage(error.FirebaseError);
          })
          
          // this.commonService.insertPatient(insertPatientData);
        }
      }else {
        // this.commonService.insertPatient(insertPatientData);
        this.firestore.collection('patientsList').add(insertPatientData).then(response => {
          this.navCtrl.navigateRoot('/dashboard');
        }, error => {
          console.log(error, 'error');
        })
      }
    }
  }


  async openActionSheet() {
    let inputNode = document.createElement("input");
    inputNode.setAttribute("type", "file");
    inputNode.setAttribute("accept", "image/png, image/jpg");
    inputNode.setAttribute("style", "position: relative; z-index: 99999; width: 100%; height: 100%; opacity: 0; top: -50px");
    inputNode.addEventListener("change", (event) => { this.profilePicUpload(event) });
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload File',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Camera',
        role: 'destructive',
        icon: 'camera-reverse-outline',
        handler: () => {
          this.openCamera();
        }
      }, {
        text: 'Gallery',
        icon: 'image-outline',
        handler: () => {
          // this.openGallery();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present().then(() => {
      actionSheet.querySelectorAll("button")[1].appendChild(inputNode);
    });

    await actionSheet.onDidDismiss().then(() => {
      inputNode.removeEventListener("change", (event) => { this.profilePicUpload(event) });
    });
    // console.log('onDidDismiss resolved with role', role);
  }

  openCamera(){
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.fileName = base64Image;
      this.patientDetail.patchValue({'profilePic': this.fileName})
     }, (err) => {
      // Handle error
     });
  }

  profilePicUpload(event){
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result, 'base64');
        // this.base64ToBlob(reader.result);
        if(file && file.size < 1000000){
          this.fileName = reader.result;
          this.patientDetail.patchValue({'profilePic': this.fileName})
        }else {
          this.commonService.toastMessage('File size should not be more then 1MB');
        }
        
    };
  }

}
