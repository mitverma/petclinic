import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-viewpass',
  templateUrl: './viewpass.component.html',
  styleUrls: ['./viewpass.component.scss'],
})
export class ViewpassComponent implements OnInit {
  passData: any;
  getId: string;
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private socialSharing: SocialSharing) {
    this.route.paramMap.subscribe(res => {
      this.getId = res.get('id');
    })
  }

  ngOnInit() {
    if(this.getId){
      this.firestore.doc('users/'+this.getId).get().subscribe(response => {
        console.log(response.data());
        this.passData = response.data();
        this.passData.fullImage = this.passData.profilePic+'.'+this.passData.fileExtension;
      })
    }
  }

  share(){
    let string = 'Your 6 Digit Code' + this.passData.sixDigitCode + 'is a Digital Pass code'
    this.socialSharing.share(string, 'subject', '', '').then((response) => {
      console.log(response, 'response');
    })
  }

}
