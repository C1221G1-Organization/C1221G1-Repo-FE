import {Component, OnInit} from '@angular/core';
import {HomePageService} from '../../service/home-page/home-page.service';
import {MedicineBestSeller} from '../../dto/medicine-best-seller';
import {ToastrService} from 'ngx-toastr';
import {ShareService} from '../../share/ShareService';
import {CartDetailDto} from '../../dto/CartDetailDto';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  medicineList: Array<MedicineBestSeller> = [];
  medicineBestSellerList: Array<MedicineBestSeller> = [];
  medicineBestSellerList1: Array<MedicineBestSeller> = [];
  medicineBestSellerList2: Array<MedicineBestSeller> = [];
  currentPage: number;
  totalPages: number;
  name = '';
  typeId = '';
  sort = 'idDesc';
  cartList: Array<any> = [];
  cartDetailDtos: CartDetailDto[] = [];


  constructor(private homePageService: HomePageService, private toastrService: ToastrService,
              private shareService: ShareService) {
    this.shareService.changeEmitted$.subscribe(data => {
      console.log(data);
      this.name = data.medicineName;
      this.typeId = data.medicineTypeId;
      this.getAllMedicineByNameAndTypeId({page: 0, size: 5, name: this.name, typeId: this.typeId, sort: this.sort});
    });
  }


  ngOnInit(): void {
    this.getAllMedicineBestSeller();
    this.getAllMedicineByNameAndTypeId({page: 0, size: 5});
  }

  /*
  Created by AnP
  Time: 16:00 02/07/2022
  Function: Get list 10 medicines best seller
  */
  getAllMedicineBestSeller() {
    this.homePageService.getMedicineBestseller().subscribe((medicineBestsellers) => {
      this.medicineBestSellerList = medicineBestsellers;
      for (let i = 0; i < this.medicineBestSellerList.length / 2; i++) {
        this.medicineBestSellerList1[i] = this.medicineBestSellerList[i];
      }
      for (let i: number = this.medicineBestSellerList.length / 2; i < this.medicineBestSellerList.length; i++) {
        this.medicineBestSellerList2[i - 5] = this.medicineBestSellerList[i];
      }
    }, error => {
      console.log(error);
    });

  }

  /*
    Created by AnP
    Time: 16:00 02/07/2022
    Function: Get All Medicine
  */
  getAllMedicineByNameAndTypeId(request) {
    this.homePageService.getMedicineByNameAndTypeId(request).subscribe((data) => {
      console.log(data);
      if (data != null) {
        this.medicineList = data.content;
        this.currentPage = data.number;
        this.totalPages = data.totalPages;
      } else {
        console.log(this.medicineList.length);
        this.medicineList = [];
        this.currentPage = -1;
        this.totalPages = 0;
      }

    }, error => {
      console.log(error);
    });

  }

  /*
  Created by AnP
  Time: 17:00 02/07/2022
  Function: Get All Medicine And Search by medicine_name and medicine_type
  */
  searchMedicine(name: HTMLInputElement, typeId: HTMLSelectElement) {
    this.name = name.value;
    this.typeId = typeId.value;
    this.getAllMedicineByNameAndTypeId({page: 0, size: 5, name: this.name, typeId: this.typeId, sort: this.sort});
  }


  /*
  Created by AnP
  Time: 17:30 02/07/2022
  Function: Get All Medicine And Sort by newest or highest or lowest
  */
  sortMedicine(sort: HTMLSelectElement) {
    this.sort = sort.value;
    console.log(sort.value);
    this.getAllMedicineByNameAndTypeId({page: 0, size: 5, name: this.name, typeId: this.typeId, sort: this.sort});
  }

  /*
  Created by AnP
  Time: 17:30 02/07/2022
  Function: Add medicine to Cart by LocalStorage
  */
  addItemToCart(medicine: MedicineBestSeller) {

    // this.cartList = JSON.parse(localStorage.getItem('cart'));
    // if (this.cartList == null) {
    //   const newCart = {};
    //   newCart[medicineId] = 1;
    //   localStorage.setItem('cart', JSON.stringify(newCart));
    //   this.showMessageSuccess(medicineName);
    // } else {
    //   this.cartList[medicineId] = this.cartList[medicineId] ?
    //     this.cartList[medicineId] + 1 :  1;
    //   localStorage.setItem('cart', JSON.stringify(this.cartList));
    //   this.showMessageSuccess(medicineName);
    // }
    // console.log(localStorage.getItem('cart'))
    // Kiem tra xem dã đăng nhập hay chưa
    // TH chưa đăng nhập
    if (localStorage.getItem('cart')) {
      this.cartDetailDtos = JSON.parse(localStorage.getItem('cart'));
    }
    let exists = false;
    // for(let i=0; i<this.cartDetailDtos.length;i++){
    //   if (this.cartDetailDtos[i].medicine.medicineId == medicine.medicineId) {
    //     exists = true;
    //     this.cartDetailDtos[i].quantity += 1;
    //   }
    // }
    this.cartDetailDtos.forEach(item => {
      // tslint:disable-next-line:triple-equals
      if (item.medicine.medicineId == medicine.medicineId) {
        exists = true;
        item.quantity += 1;
      }
    });
    if (!exists) {
      const cartDetailDto = {} as CartDetailDto;
      cartDetailDto.quantity = 1;
      cartDetailDto.medicine = medicine;
      console.log(this.cartDetailDtos);
      this.cartDetailDtos.push(cartDetailDto);
    }
    localStorage.setItem('cart', JSON.stringify(this.cartDetailDtos));
    console.log(localStorage.getItem('cart'));
  }

  /*
  Created by AnP
  Time: 18:30 02/07/2022
  Function: Previous Page for method Get All Medicine
  */
  // previousPage() {
  //   const request = {};
  //   if ((this.currentPage) > 0) {
  //     console.log(request);
  //     request.page = this.currentPage - 1;
  //     request.size = 5;
  //     request.name = this.name;
  //     request.typeId = this.typeId;
  //     request.sort = this.sort;
  //     this.getAllMedicineByNameAndTypeId(request);
  //   }
  // }

  /*
  Created by AnP
  Time: 18:30 02/07/2022
  Function: Next Page for method Get All Medicine
  */
  // nextPage() {
  //   const request = {};
  //   if ((this.currentPage + 1) < this.totalPages) {
  //     console.log(request);
  //     request.page = this.currentPage + 1;
  //     request.size = 5;
  //     request.name = this.name;
  //     request.typeId = this.typeId;
  //     request.sort = this.sort;
  //     this.getAllMedicineByNameAndTypeId(request);
  //   }
  // }

  showMessageSuccess(medicineName: string) {
    this.toastrService.success('Đã thêm thành công ' + medicineName, 'Thông báo', {
      timeOut: 2000,
      progressBar: true,
    });
  }

  showMessageError(medicineName: string) {
    this.toastrService.error('Thuốc ' + medicineName + ' đã hết hàng', 'Thông báo', {
      timeOut: 2000,
      progressBar: true,
    });
  }

}
