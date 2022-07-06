import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isSeenToggle(uuid: any) {
    firebase.database().ref('rooms/' + uuid).once('value').then(res => {
      const room = res.val();
      firebase.database().ref('rooms/' + uuid).update({...room, isSeen: true});
    });
  }
}
