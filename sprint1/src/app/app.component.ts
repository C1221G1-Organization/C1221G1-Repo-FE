import {Component} from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../environments/environment';

import {TokenStorageService} from "./service/security/token-storage.service";

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.css']
})
export class AppComponent {
  title = 'pharmacy-manager';

  isGuest = true;
  user;

  constructor(private tokenStorageService: TokenStorageService) {
    firebase.initializeApp(environment.firebaseConfig);
    this.user = this.tokenStorageService.getUser();
    if (this.user == null) {
      this.isGuest = true;
    }
    if (this.user != null) {
      if (this.user.roles[0] == "ROLE_USER") {
        this.isGuest = true;
      } else {
        this.isGuest = false;
      }
    }
    this.isGuest = false;
    console.log(this.user);
  }

}
