import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {MedicineDetailDto} from '../../../dto/medicine-detail.model';
import {MedicineService} from '../medicine.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector   : 'app-medicine-detail',
  templateUrl: './medicine-detail.component.html',
  styleUrls  : ['./medicine-detail.component.css']
})
export class MedicineDetailComponent implements OnInit, AfterViewChecked {

  medicineId: string;
  medicine: MedicineDetailDto;
  relativeMedicineList: MedicineDetailDto[];
  quantity = 1;

  constructor(private toastr: ToastrService,
              private router: Router,
              private medicineService: MedicineService,
              private activatedRoute: ActivatedRoute) {

  }
  /**
   * @Author NghiaNTT
   * @Time: 03/07/2022
   * @param
   * @return get medicine and its relatives.
   */
  ngOnInit(): void {
    this.activatedRoute.url.subscribe((s: UrlSegment[]) => {
      this.quantity = 1;
      this.medicineId = s[s.length - 1].path;
      this.medicineService.getMedicineDetailForView(this.medicineId).subscribe(
        medicine => {
          this.medicine = medicine;
        }, err => {
          this.router.navigateByUrl("not-found")
        }
      );
      this.medicineService.get5RelativeMedicinesOf(this.medicineId).subscribe(
        data => {
          this.relativeMedicineList = data;
        }, err => console.log(err)
      );
    });
  }

  /**
   * @Author NghiaNTT
   * @Time: 03/07/2022
   * @param
   * @return increase quantity when user click [-] button
   */
  increaseQuantity() {
    this.quantity++;
    this.quantity = this.quantity > this.medicine.medicineQuantity ? this.medicine.medicineQuantity : this.quantity;
  }
  /**
   * @Author NghiaNTT
   * @Time: 03/07/2022
   * @param
   * @return decrease quantity when user click [+] button
   */
  decreaseQuantity() {
    this.quantity--;
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }
  /**
   * @Author NghiaNTT
   * @Time: 03/07/2022
   * @param
   * @return add item and quantity to localstorage
   */
  addItemToCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart == null) {
      const newCart = {};
      newCart[this.medicine.medicineId] = this.quantity;
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      cart[this.medicine.medicineId] = cart[this.medicine.medicineId] ?
        cart[this.medicine.medicineId] + this.quantity :
        this.quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    this.toastr.success(`Thêm thành công ${this.quantity} sản phẩm vào giỏ hàng`, '', {
      timeOut    : 3000,
      progressBar: false
    });
  }
  /**
   * @Author NghiaNTT
   * @Time: 03/07/2022
   * @param
   * @return scroll to top when view is checked
   */
  ngAfterViewChecked() {
    console.log("view checkeđ");
    // Hack: Scrolls to top of Page after page view initialized
    // let top = document.getElementById('product-detail-view');
    // if (top !== null) {
    //   top.scrollIntoView();
    //   top = null;
    // }
  }

}
