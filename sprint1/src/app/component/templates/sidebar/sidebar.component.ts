import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../service/security/token-storage.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLogIn = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService,) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLogIn = true;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

}
