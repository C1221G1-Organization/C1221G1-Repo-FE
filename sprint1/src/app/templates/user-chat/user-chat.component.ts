import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase';
import {snapshotToArray} from '../../admin-chat/admin-chat.component';
import {UserChat} from '../../dto/user-chat.model';
import {ToastrService} from 'ngx-toastr';
import {Chat} from '../../dto/chat.model';
import {getTimeStamp} from '../../utils/time-stamp.utils';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector   : 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls  : ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {
  @ViewChild('chatContent') chatContent: ElementRef;
  scrollTop: number = null;

  isExpanded = false;
  isClosed = false;
  isLogin = false;
  customerForm: FormGroup;
  chatForm: FormGroup;
  userChat: UserChat;
  message = '';
  uuid: string;
  chats = [];
  chat: Chat;

  constructor(private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {

  }

  loginToChatRoom() {
    firebase.database().ref('chats/' + this.uuid).on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => this.scrollTop = this.chatContent.nativeElement.scrollHeight, 200);
    });
  }

  ngOnInit(): void {
    this.userChat = JSON.parse(localStorage.getItem('user-chat-info'));
    if (this.userChat && this.userChat.name && this.userChat.phone && this.userChat.uuid) {
      this.uuid = this.userChat.uuid;
      firebase.database().ref('users/').orderByChild('uuid').equalTo(this.uuid).once('value', snapshot => {
        if (snapshot.exists()) {
          this.isLogin = true;
          this.loginToChatRoom();
        } else {
          localStorage.removeItem('user-chat-info');
        }
      });
    } else {
      this.uuid = uuidv4();
      this.customerForm = this.formBuilder.group({
        'name'   : [null, [Validators.required, Validators.pattern(/^((?!admin|\d|[\\_.\/*)\-+^$<>,"':\]\[{}&=%#@!`]).)+$/i)]],
        'phone'  : [null, [Validators.required, Validators.pattern('^0\\d{9}$')]],
        'message': [null, Validators.required]
      });
    }
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  closePanel() {
    this.isClosed = true;
  }


  onChatSubmit() {
    const chat = this.chatForm.value;
    chat.name = this.userChat.name;
    chat.uuid = this.uuid;
    chat.createdAt = getTimeStamp();
    const newMessage = firebase.database().ref('chats/' + this.uuid).push();
    newMessage.set(chat);
    this.chatForm.reset();
  }

  onCustomerFormSubmit() {
    if (this.customerForm.valid) {
      const form = this.customerForm.value;
      this.userChat = {};
      this.userChat.name = form.name;
      this.userChat.phone = form.phone;
      this.userChat.uuid = this.uuid;
      firebase.database().ref('users/').push().set(this.userChat);
      firebase.database().ref('rooms/' + this.uuid).set({...this.userChat, isSeen: false, uuid: null});
      this.chat = {};
      this.chat = {...this.userChat, message: form.message, createdAt: getTimeStamp()};
      firebase.database().ref('chats/' + this.uuid).push().set(this.chat);
      localStorage.setItem('user-chat-info', JSON.stringify(this.userChat));
      this.isLogin = true;
    } else {
      this.toastr.info('Vui lòng nhập chính xác thông tin', '', {
        timeOut    : 3000,
        progressBar: false
      });
    }
  }

  handleFirstMessageChat(formValue) {

  }

  handleAddNewCustomer(formValue) {

  }
}
