import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SecurityService} from "../../../service/security/security.service";
import {SignInRequest} from "../../../dto/request/SignInRequest";
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {ToastrService} from "ngx-toastr";
// import {FacebookAuthService} from "../../../service/security/facebook-auth.service";
import firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import {FacebookRequest} from "../../../dto/request/facebook-request";


let provider = new firebase.auth.FacebookAuthProvider();

/**
 * @Author HuuNQ
 * @Time 17:00:00 04/07/2022
 * @Function Component use for sign in  to use more function
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  token: string;
  userName: string;
  roles: [];
  types: string;
  isSignIn: boolean = false;
  errorMap:any;
  constructor(private securityService: SecurityService,
              private route: Router,
              private tokenStorageService: TokenStorageService,
              private toast: ToastrService,
              // public facebookAuth: FacebookAuthService,
              public angularFireAuth: AngularFireAuth
  ) {

  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(''),
    })
    if (this.tokenStorageService.getToken()) {
      this.isSignIn = true;
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userName = user.username;
    }
    // if (this.isSignIn) {
    //   this.route.navigateByUrl('/').then();
    // }
  }

  submitSignIn() {
    if (this.signInForm.valid) {
      const username = this.signInForm.value.username;
      const password = this.signInForm.value.password;
      const signInSubmitForm: SignInRequest = {username, password};
      this.securityService.signIn(signInSubmitForm).subscribe(
        next => {
          if (this.signInForm.value.remember) {
            this.tokenStorageService.saveTokenLocal(next.token);
            this.tokenStorageService.saveUserLocal(next);
          } else {
            this.tokenStorageService.saveTokenSession(next.token)
            this.tokenStorageService.saveUserSession(next);
          }
          this.userName = this.tokenStorageService.getUser().username;
          this.roles = this.tokenStorageService.getUser().roles;
          this.isSignIn = true;
          this.toast.success("Đăng nhập thành công", "Chúc mừng", {
            timeOut: 1000, tapToDismiss: true,
          })
          this.signInForm.reset();

          this.roles.forEach(role => {
            if (role === 'ROLE_USER') {
              this.route.navigateByUrl('/home-page').then(() => {
                window.location.reload()
              });
            } else {
              this.route.navigateByUrl('/sales-management/retail').then();
            }
          })


        },
        error => {
          console.log(error);
          if(error.status == 403){
            this.toast.warning("Mật khẩu không chính xác","Lỗi Đăng Nhập");
          }else{
            if(error.error?.errorMap?.notExists){
              this.toast.warning(error.error.errorMap['notExists'],"Lỗi Đăng Nhập");
            }else{
              this.errorMap = error.error.errorMap;
            }
          }
        }
      )
    }
  }

  FacebookAuth() {
    provider.setCustomParameters({
      'display': 'popup'
    })
    provider.addScope('user_gender')
    provider.addScope('user_location')
    provider.addScope('user_birthday')
    return this.AuthLogin(provider);
  }

  signInWithFaceBook() {

    this.FacebookAuth();

  }

  fbSignIn: SignInRequest = null;

  AuthLogin(provider) {
    let email: string;
    let fbRequest: FacebookRequest;
    let facebook: string;
    let pass: string;
    let signInRequest: SignInRequest = {};

    this.angularFireAuth.signInWithPopup(provider).then(r => {
      // @ts-ignore
      let accessToken = r.credential.accessToken.substring(0, 20);
      let profile = r.additionalUserInfo.profile;

      email = profile['email'];
      let gender = profile['gender'];
      let location = profile['location'].name;
      fbRequest = {email, gender, accessToken, location};
      this.securityService.signInWithFacebook(fbRequest).subscribe(
        next => {
          facebook = email;
          pass = accessToken;

          console.log(facebook);
          console.log(pass);
          signInRequest = {
            "username": facebook,
            "password": pass
          }
          console.log(signInRequest);
          this.securityService.signIn(signInRequest).subscribe(
            result => {
              this.tokenStorageService.saveTokenLocal(result.token);
              this.tokenStorageService.saveUserLocal(result);
              this.tokenStorageService.saveTokenSession(result.token)
              this.tokenStorageService.saveUserSession(result);
              this.userName = this.tokenStorageService.getUser().username;
              this.roles = this.tokenStorageService.getUser().roles;
              this.isSignIn = true;
              this.toast.success("Đăng nhập thành công", "Chúc mừng", {
                timeOut: 1000, tapToDismiss: true,
              })
            }
          )
        },
      )
    });
  }
}





