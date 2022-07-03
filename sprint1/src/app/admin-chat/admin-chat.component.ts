import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];
  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {

  users: any[];

  constructor() {
    firebase.database().ref('users/' ).on('value', resp => {
      this.users = [];
      this.users = snapshotToArray(resp);
    });
  }

  ngOnInit(): void {
  }

}
