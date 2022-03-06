import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionSheetController, NavController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-generatepass',
  templateUrl: './generatepass.component.html',
  styleUrls: ['./generatepass.component.scss'],
})
export class GeneratepassComponent implements OnInit {
  passDetail: FormGroup;
  fileInfo: any;
  fileBaseView:any
  viewPass: boolean = false;
  apiCallOnce: boolean = false;
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(private camera: Camera, private actionSheetController :ActionSheetController, private storage: AngularFireStorage, private firestore: AngularFirestore, private navCtrl : NavController, private toastController: ToastController) {
    this.passDetail = new FormGroup({
      profilePic: new FormControl(''),
      fileExtension: new FormControl(''),
      visitorName: new FormControl('', [Validators.required]),
      contactNo: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      passType: new FormControl('', [Validators.required]),
      currentDate: new FormControl(''),
      sixDigitCode: new FormControl('')
    })
  }

  ngOnInit() {}


  generatePass(formData){
    if(formData.valid && this.fileInfo){
      let todayDate = new Date();
      let setCurrentDateTime = todayDate.getDate()+'/'+(todayDate.getMonth()+1)+'/'+todayDate.getFullYear()+'-'+todayDate.getHours()+'-'+todayDate.getMinutes();

      console.log(formData, 'form data', formData.value);
      formData.value.sixDigitCode = Math.floor(100000 + Math.random() * 900000);
      this.apiCallOnce = true;
      let newGatePass = formData.value;
      newGatePass.currentDate = setCurrentDateTime;
      if(this.apiCallOnce){
        this.addUsers(newGatePass).then(res => {
          newGatePass['id'] =  res.id;
          console.log(res, 'user updated response');
          this.uploadFile(this.fileInfo, res.id).then(uploadRes => {
            if(uploadRes){
              this.storage.ref(res.id).getDownloadURL().subscribe(downloadUrlPath => {
                newGatePass['profilePic'] =  downloadUrlPath;
                newGatePass['fileExtension'] = this.fileInfo.type ? this.fileInfo.type.split('/')[1]: this.fileInfo.type;
                this.updateUser(newGatePass,newGatePass.id).then((updated) => {
                  console.log(updated, 'updated profile');
                  this.fileInfo = null;
                  this.fileBaseView = null;
                  this.viewPass =  true;
                  this.passDetail.reset();
                  this.navCtrl.navigateForward(['/viewpass', res.id]);
                  this.apiCallOnce = false;
                  this.toastMessage('Data uploaded successfully');
                }, error => {
                  // this.fileInfo = null;
                  // this.fileBaseView = null;
                  console.log(error,'update user error');
                  this.toastMessage(error);
                })
              }, error => {
                console.log(error, 'file storage get full path error');
                this.toastMessage(error);
              })
            }
          }, error => {
            console.log(error, 'upload file error');
            this.toastMessage(error);
          })
        }, error => {
          console.log(error, 'add users error');
          this.toastMessage(error);
        })
      }
      
    }else {

    }   
  }


  async openActionSheet() {
    let inputNode = document.createElement("input");
    inputNode.setAttribute("type", "file");
    inputNode.setAttribute("accept", "image/png, image/jpg");
    inputNode.setAttribute("style", "position: relative; z-index: 99999; width: 100%; height: 100%; opacity: 0; top: -50px");
    inputNode.addEventListener("change", (event) => {
       this.profilePicUpload(event);
    });
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
      inputNode.removeEventListener("change", (event) => {
         this.profilePicUpload(event);
        });
    });
    // console.log('onDidDismiss resolved with role', role);
  }


  openCamera(){
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // alert(imageData+ 'image data');
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.fileBaseView = base64Image;
      // this.fileInfo = imageData;
      this.fileInfo = this.base64ToImage(this.fileBaseView);
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
        // 5mb condition
        if(file && file.size < 5000000){
          this.fileInfo = file;
          this.fileBaseView = reader.result;
          // this.passDetail.patchValue({'profilePic': this.fileInfo})
        }else {
          this.toastMessage('File size is greater than 5 MB');
          // this.commonService.toastMessage('File size should not be more then 1MB');
        }
        
    };
  }


  addUsers(userObj){
    return this.firestore.collection('users').add(userObj);
  }

  updateUser(userObj, key){
    return this.firestore.doc('users/'+key).update(userObj);
  }

  uploadFile(fileData, key){
    return this.storage.upload(key, fileData);
  }

  
  base64ToImage(dataURI) {
    const fileDate = dataURI.split(',');
    // const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }

  async toastMessage(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
