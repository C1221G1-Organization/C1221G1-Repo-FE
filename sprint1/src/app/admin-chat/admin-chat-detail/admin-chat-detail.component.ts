import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import * as firebase from 'firebase';
import {snapshotToArray} from '../admin-chat.component';
import {environment} from '../../../environments/environment';
import {getTimeStamp} from '../../utils/time-stamp.utils';

@Component({
  selector: 'app-admin-chat-detail',
  templateUrl: './admin-chat-detail.component.html',
  styleUrls: ['./admin-chat-detail.component.css']
})
export class AdminChatDetailComponent implements OnInit {
  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;
  adminChat = environment.adminChat;
  chatForm: FormGroup;
  userUUID = '';
  user: any;
  chats = [];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {

    route.url.subscribe((s:UrlSegment[]) => {
      this.userUUID = s[s.length - 1].path;
      console.log(this.userUUID)
      firebase.database().ref('chats/' + this.userUUID).on('value', resp => {
        this.chats = [];
        this.chats = snapshotToArray(resp);
        setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 200);
      });
      firebase.database().ref('users/').orderByChild('uuid').equalTo(this.userUUID).on('value', (resp2: any) => {
        this.user = snapshotToArray(resp2)[0];
      });
    })

  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
  }

  onFormSubmit() {
    const chat = this.chatForm.value;
    chat.roomname = this.userUUID;
    chat.name = this.adminChat.name;
    chat.createdAt = getTimeStamp();
    const newMessage = firebase.database().ref('chats/' + this.userUUID).push();
    newMessage.set(chat);
    this.chatForm.reset();
  }
}
