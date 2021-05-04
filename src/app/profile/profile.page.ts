import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CommonService } from '../common.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  fileName: any = null;
  jsonLocalDb: any;
  userData: any;
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  

  constructor(private actionSheetController :ActionSheetController, private camera: Camera, private socialSharing: SocialSharing, private commonService: CommonService, private firestore: AngularFirestore) { 
    this.profileForm = new FormGroup({
      fullname: new FormControl(),
      mobileNo: new FormControl(),
      emailId: new FormControl()
    })
  }

  ngOnInit() {
    // this.jsonLocalDb = this.commonService.getLocalDatabase();
    this.userData = this.commonService.getLoggedInUserData();
    this.profileForm.patchValue({
      fullname: this.userData.fullname,
      mobileNo: this.userData.mobileNo,
      emailId: this.userData.emailId
    })
    if(this.userData && this.userData.profilePic){
      this.fileName = this.userData.profilePic
    }
    console.log(window, 'window');
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
    };
  }

  base64ToBlob(base64){
    let blobFile = this.dataURItoBlob(base64);
    this.fileName = new File([blobFile], 'image.png',{ type: 'image/png' });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
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
      },
      // {
      //   text: 'Share',
      //   icon: 'image-outline',
      //   handler: () => {
      //     this.openShare();
      //   }
      // },
       {
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
     }, (err) => {
      // Handle error
     });
  }

  openShare(){
    console.log('testing');
    // Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });
    this.socialSharing.share('test', 'subject', '', '').then((response) => {
      console.log(response, 'response');
    })
  }

  openGallery(){
    console.log('')
  }

  saveProfile(formData){
    if(formData.valid){
      // if(this.jsonLocalDb && this.jsonLocalDb.users && this.jsonLocalDb.users.length){
      //   let isUserPresent = this.jsonLocalDb.users.find(list => list.mobileNo == this.userData.mobileNo);
      //   let getUserIndex = this.jsonLocalDb.users.findIndex(list => list.mobileNo ==  this.userData.mobileNo);
      //   if(isUserPresent && getUserIndex != -1){
      //     this.jsonLocalDb.users[getUserIndex].fullname = formData.value.fullname;
      //     this.commonService.setLocalDatabase(this.jsonLocalDb);
      //     this.commonService.setUserData(this.jsonLocalDb.users[getUserIndex]);
      //   }
      // }

      if(this.userData && this.userData.fireBaseId){
        let userValue = {
          emailId: this.userData.emailId,
          fullname: formData.value.fullname,
          id: this.userData.id,
          mobileNo: this.userData.mobileNo,
          password: this.userData.password,
          profilePic: this.fileName
        }
        this.firestore.doc('users/'+this.userData.fireBaseId).update(userValue).then(res => {
          userValue['fireBaseId'] = this.userData.fireBaseId;
          this.commonService.setUserData(userValue);
          this.commonService.toastMessage('Data saved successfully');
        })
      }
    }
  }
}
