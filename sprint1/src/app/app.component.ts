import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pharmacy-manager';

  isGuest = false;
  user;

  // constructor(private tokenStorageService: TokenStorageService) {
  //   this.user = this.tokenStorageService.getUser();
  //   if (this.user == null) {
  //     this.isGuest = true;
  //   }
  //   if (this.user !=null){
  //     if (this.user.roles == "ROLE_USER") {
  //       this.isGuest = true;
  //     } else {
  //       this.isGuest = false;
  //     }
  //   }
  //   console.log(this.user)
  // }

}
