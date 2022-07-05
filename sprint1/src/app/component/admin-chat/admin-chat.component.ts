import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";
import "firebase/database";


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
  /**
   * @Author NghiaNTT
   * @Time: 03/07/2022
   * @param
   * @return retrieve rooms from Rooms FRD and sort by lastMessagePost time
   */
  constructor() {
    firebase.database().ref('rooms/' ).on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      this.rooms.sort((a,b) => b.lastMessagePost - a.lastMessagePost)
    });
  }

  ngOnInit(): void {
  }

  isSeenToggle(uuid: any) {
    firebase.database().ref('rooms/' + uuid).once('value').then(res => {
      const room = res.val();
      firebase.database().ref('rooms/' + uuid).update({...room, isSeen: true});
    });
  }
}
