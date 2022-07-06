import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SecurityService} from "../../../service/security/security.service";
import {SignInRequest} from "../../../dto/request/SignInRequest";
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {FacebookAuthService} from "../../../service/security/facebook-auth.service";


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
  token : string;
  userName : string;
  roles:[];
  types: string;
  isSignIn: boolean = false;

  constructor(private securityService:SecurityService,
              private route: Router,
              private tokenStorageService: TokenStorageService,
              private toast:ToastrService,
              public facebookAuth:FacebookAuthService
  ) {

  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
      remember: new FormControl(''),
    })
    if (this.tokenStorageService.getToken()) {
      this.isSignIn = true;
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userName = user.username;
    }
    if(this.isSignIn){
      this.route.navigateByUrl('/').then();
    }
  }

  submitSignIn() {
    if(this.signInForm.valid){
        const username = this.signInForm.value.username;
        const password = this.signInForm.value.password;
        const signInSubmitForm : SignInRequest = {username ,password};
        this.securityService.signIn(signInSubmitForm).subscribe(
          next => {
            if(this.signInForm.value.remember){
              this.tokenStorageService.saveTokenLocal(next.token);
              this.tokenStorageService.saveUserLocal(next);
            }else{
              this.tokenStorageService.saveTokenSession(next.token)
              this.tokenStorageService.saveUserSession(next);
            }
            this.userName = this.tokenStorageService.getUser().username;
            this.roles = this.tokenStorageService.getUser().roles;

            this.isSignIn = true;
            this.toast.success("Đăng nhập thành công","Chúc mừng", {
              timeOut:1000,tapToDismiss:true,
            })
            this.signInForm.reset();
            setTimeout(()=>{
              this.roles.forEach(role =>{
                if(role === 'ROLE_USER'){
                  this.route.navigateByUrl('/home-page').then();
                }else{
                  this.route.navigateByUrl('/')
                }
              })

            },1000)

          },
          error => {
            this.isSignIn = false;
            if(error.error?.errorMap){
              this.toast.warning("Đăng nhập không thành công","Thông báo")
                }else{
              this.toast.warning("Mật khẩu không chính xác","Thông báo")
                }
          }
        )
    }
  }
  signInWithFaceBook(e){
    e.preventDefault();
    this.facebookAuth.FacebookAuth();
  }
}
