import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
let provider = new firebase.auth.FacebookAuthProvider();
@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {
  user : object;
  constructor(public afAuth: AngularFireAuth) { }
  FacebookAuth(){
    provider.addScope('user_gender')
    provider.addScope('user_location')
    provider.addScope('user_birthday')
    provider.setCustomParameters({
      'display':'popup'
    })
    return this.AuthLogin(provider);
  }

  AuthLogin(provider) {
    this.afAuth.signInWithPopup(provider).then( r => {
      // @ts-ignore
      let accessToken = r.credential.accessToken;
      let profile = r.additionalUserInfo.profile;

      let email = profile['email'];
      let gender = profile['gender'];
      let location = profile['location'].name;
      let id = profile['id'];
      let picture = profile['picture'].data.url;
      console.log(accessToken);
      console.log(profile);
      console.log(email)
      console.log(gender)
      console.log(location)
      console.log(id)
      console.log(picture)

    })
      .catch(reason => console.log(reason))
  }
}
