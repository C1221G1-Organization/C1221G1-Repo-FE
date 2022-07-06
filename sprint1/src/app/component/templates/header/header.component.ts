import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MedicineHomePage} from '../../../dto/medicine/medicine-home-page';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareService} from '../../../share/ShareService';
import {TokenStorageService} from '../../../service/security/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, AfterContentChecked {
  isLogIn = false;
  username: string;
  productQuantityInCart = 0;
  roles: string[];
  cartList: any[] = [];
  medicine = {} as MedicineHomePage;
  cartDetailDtos: any = [];
  medicineTypeList = [{id: 1, name: 'Bổ'}, {id: 2, name: 'Cảm'}];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private changeDetectorRef: ChangeDetectorRef,
              private shareService: ShareService) {
  }

  ngOnInit(): void {
  }

}
