import { Component, OnInit } from '@angular/core';
import {getTimeStamp} from "../../../utils/time-stamp.utils";
import firebase from "firebase";

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * * @Author NghiaNTT
   * * @Time: 03/07/2022
   * * @param
   * * @return close chat box
   * */
  closePanel() {
    this.isClosed = true;
  }

  /**
   * * @Author NghiaNTT
   * * @Time: 03/07/2022
   * * @param
   * * @return add Chat in Chats FRD, Update lastMessagePost time in Rooms FRD
   * */
  onChatSubmit() {
    const chat = this.chatForm.value;
    if (chat.message.trim().length != 0) {
      chat.name = this.userChat.name;
      chat.uuid = this.uuid;
      chat.message = chat.message.trim();
      chat.createdAt = getTimeStamp();
      firebase.database().ref('chats/' + this.uuid).push().set(chat);
      firebase.database().ref('rooms/' + this.uuid).once('value').then(res => {
        const room = res.val();
        firebase.database().ref('rooms/' + this.uuid).update({...room, lastMessagePost: getTimeStamp(), isSeen: false});
      });
      this.chatForm.reset();
    }
  }
  /**
   * * @Author NghiaNTT
   * * @Time: 03/07/2022
   * * @param
   * * @return handle user login.
   * * 1. add new user to Users FRD
   * * 2. add new room to Rooms FRD
   * * 3. add new chat to Chats FRD
   * * 4. save item in localStorage
   * */
  onCustomerFormSubmit() {
    this.uuid = uuidv4();
    if (this.customerForm.valid) {
      const form = this.customerForm.value;
      this.userChat = {};
      this.userChat.name = form.name;
      this.userChat.phone = form.phone;
      this.userChat.uuid = this.uuid;
      firebase.database().ref('users/').push().set(this.userChat);
      firebase.database().ref('rooms/' + this.uuid).set({
        ...this.userChat,
        isSeen: false,
        lastMessagePost: getTimeStamp()
      });
      this.chat = {};
      this.chat = {...this.userChat, message: form.message, createdAt: getTimeStamp()};
      firebase.database().ref('chats/' + this.uuid).push().set(this.chat);
      localStorage.setItem('user-chat-info', JSON.stringify(this.userChat));
      this.isLogin = true;
      this.loginToChatRoom();
    } else {
      this.toastr.info('Vui lòng nhập chính xác thông tin', '', {timeOut: 3000, progressBar: false});
    }
  }
}
