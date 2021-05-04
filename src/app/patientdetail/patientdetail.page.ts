import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CommonService } from '../common.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-patientdetail',
  templateUrl: './patientdetail.page.html',
  styleUrls: ['./patientdetail.page.scss'],
})
export class PatientdetailPage implements OnInit {
  patientDetailForm: FormGroup;
  pateintVisitData = [];
  getPatientAllDetails: any;
  jsonLocalDb: any;
  fileName: any;
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(private activateRoute: ActivatedRoute,private actionSheetController :ActionSheetController, private camera: Camera, private navCtrl: NavController, private commonService: CommonService,  private socialSharing: SocialSharing, private firestore: AngularFirestore) {


    this.getPatientAllDetails = this.activateRoute.snapshot.queryParams

    // this.pateintVisitData = this.getPatientAllDetails.visitDetails;


    this.patientDetailForm = new FormGroup({
      profilePic: new FormControl(''),
      ownerName: new FormControl('', [Validators.required]),
      contactNo: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required]),
      petName: new FormControl('', [Validators.required]),
      petBreedType: new FormControl('', [Validators.required]),
      medicinePrescription: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {

    // this.jsonLocalDb = this.commonService.getLocalDatabase();
    // this.firestore.collection('patientsList').snapshotChanges().subscribe(data => {
    //   if(data){
    //     this.patientList = data.map(list => list.payload.doc.data());
    //   }
    // });

    this.pateintVisitData = this.getPatientAllDetails.visitDetails;
    this.fileName = this.getPatientAllDetails.profilePic
    this.patientDetailForm.patchValue({
      profilePic: this.getPatientAllDetails.profilePic,
      ownerName: this.getPatientAllDetails.ownerName,
      contactNo: this.getPatientAllDetails.contactNo,
      emailId: this.getPatientAllDetails.emailId,
      petName: this.getPatientAllDetails.petName,
      petBreedType: this.getPatientAllDetails.petBreedType,
    })
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
      this.patientDetailForm.patchValue({'profilePic': this.fileName})
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
        this.fileName = reader.result;

        this.patientDetailForm.patchValue({'profilePic': this.fileName})
    };
  }


  savePatientDetail(patientFormData){
    if(patientFormData.valid){
      // if(this.jsonLocalDb && this.jsonLocalDb.patientsList && this.jsonLocalDb.patientsList.length){
      if(this.getPatientAllDetails && this.getPatientAllDetails.fireBaseId){
        // let isPatientPresent = this.jsonLocalDb.patientsList.find(list => list.id == this.getPatientAllDetails.id);
        // let getIndex = this.jsonLocalDb.patientsList.findIndex(list => list.id == this.getPatientAllDetails.id);
        if(this.getPatientAllDetails.fireBaseId){
          let newPresciption = {
            visitDate: this.commonService.getTodaysDate(),
            medicinePrescription: patientFormData.value.medicinePrescription
          }
          this.getPatientAllDetails.visitDetails.push(newPresciption);

          let insertPatientData = {
            id: this.getPatientAllDetails.id,
            profilePic: patientFormData.value.profilePic,
            ownerName: patientFormData.value.ownerName,
            contactNo: patientFormData.value.contactNo,
            emailId: patientFormData.value.emailId,
            petName: patientFormData.value.petName,
            petBreedType: patientFormData.value.petBreedType,
            visitDetails: this.getPatientAllDetails.visitDetails
          }

          this.firestore.doc('patientsList/' + this.getPatientAllDetails.fireBaseId).update(insertPatientData).then(res => {
            console.log(res, 'response');
              this.navCtrl.pop();
          })
          // if(getIndex != -1){
          //   this.jsonLocalDb.patientsList[getIndex] = insertPatientData;
          //   this.commonService.setLocalDatabase(this.jsonLocalDb);
          //   this.navCtrl.pop();
          // }


        }
      }
    }
  }


  openShare(){
    let string = '';
    if(this.getPatientAllDetails.visitDetails){
      this.getPatientAllDetails.visitDetails.forEach(element => {
        if(element){
          string += element.visitDate + "\n" + element.medicinePrescription + "\n";
        }
      });
    }

    console.log(string, 'string');
    this.socialSharing.share(string, 'subject', '', '').then((response) => {
      console.log(response, 'response');
    })
  }

}
