import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import {SecurityService} from "./security.service";
import {FacebookRequest} from "../../dto/request/facebook-request";
import {Router} from "@angular/router";
import {SignInRequest} from "../../dto/request/SignInRequest";

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {
  user : object;
  constructor(public afAuth: AngularFireAuth, private securityService: SecurityService,
              private route: Router) { }



}
