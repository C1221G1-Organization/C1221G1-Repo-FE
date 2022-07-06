import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
              private router : Router) { }

  ngOnInit(): void {
  }
  signOut(e){
    e.preventDefault();
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("/home-page").then()
    this.ngOnInit();
  }
}
