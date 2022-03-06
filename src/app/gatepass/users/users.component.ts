import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userList: any;
  searchItem: any;
  filteredUsersList = [];
  constructor(private navCtrl: NavController, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore.collection('users').get().subscribe(res => {
      this.userList = res.docs.map(list => list.data())
      this.filteredUsersList = this.userList;
      console.log(this.userList, this.filteredUsersList, 'users  and filtered');
    })
  }


  filterData(event){
    console.log(event, 'event');    
    this.filteredUsersList = this.userList.filter(list => {
      if(event.target.value){
        console.log(list.visitorName.toLowerCase().indexOf(event.target.value.toLowerCase()), 'value', list);
        // return list.visitorName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
        if(list.visitorName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1){
          return list.visitorName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
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
    console.log(this.filteredUsersList, 'filtered');
  }

  viewUserPass(list){

    this.navCtrl.navigateForward(['/viewpass', list.id]);
  }

}
