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

  rooms: any[];

  constructor() {
    firebase.database().ref('rooms/' ).on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      this.rooms.sort((a,b) => b.lastMessagePost - a.lastMessagePost)
    });
  }

  ngOnInit(): void {
  }

}
