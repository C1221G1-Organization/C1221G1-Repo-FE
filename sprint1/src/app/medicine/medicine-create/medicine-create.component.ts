import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MedicineService} from '../../service/medicine/medicine.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MedicineOrigin} from '../../model/medicine/medicine-origin';
import {MedicineUnit} from '../../model/medicine/medicine-unit';
import {MedicineConversionUnit} from '../../model/medicine/medicine-conversion-unit';
import {MedicineType} from '../../model/medicine/medicine-type';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-medicine-create',
  templateUrl: './medicine-create.component.html',
  styleUrls: ['./medicine-create.component.css']
})
export class MedicineCreateComponent implements OnInit {
  medicineCreateForm: FormGroup;
  medicineTypeList: MedicineType[];
  medicineOriginList: MedicineOrigin[];
  medicineUnitList: MedicineUnit[];
  medicineConversionUnitList: MedicineConversionUnit[];
  selectedImage: any;
  previewImage: any;
  fileRef: AngularFireStorageReference;
  nameImg: string;
  fireBaseURL: string;
  submit = false;

  constructor(private route: Router,
              private medicineService: MedicineService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.getALlDropDownList();
    this.medicineCreateForm = new FormGroup({
      medicineName: new FormControl(''),
      medicineActiveIngredients: new FormControl(''),
      medicineImportPrice: new FormControl(''),
      medicineDiscount: new FormControl(''),
      medicineWholesaleProfit: new FormControl(''),
      medicineRetailSaleProfit: new FormControl(''),
      medicineTax: new FormControl(''),
      medicineConversionRate: new FormControl(''),
      medicineManufacture: new FormControl(''),
      medicineUsage: new FormControl(''),
      medicineInstruction: new FormControl(''),
      medicineAgeApproved: new FormControl(''),
      medicineImage: new FormControl(''),
      medicineDescription: new FormControl(''),
      medicineOrigin: new FormControl(''),
      medicineType: new FormControl(''),
      medicineUnit: new FormControl(''),
      medicineConversionUnit: new FormControl('')
    });
  }

  /**
   * this function use to get all list spend to dropdown
   *
   * @Author LongNH
   * @Time 19:00 03/07/2022
   */
  public getALlDropDownList() {
    this.getMedicineTypeList();
    this.getMedicineOriginList();
    this.getMedicineUnitList();
    this.getMedicineConversionUnitList();
  }

  /**
   * this function use to get all medicine type
   *
   * @Author LongNH
   * @Time 19:00 03/07/2022
   */
  public getMedicineTypeList() {
    return this.medicineService.getMedicineTypeList().subscribe(medicineTypeList => {
      this.medicineTypeList = medicineTypeList;
    });
  }

  /**
   * this function use to get all medicine origin
   *
   * @Author LongNH
   * @Time 19:00 03/07/2022
   */
  public getMedicineOriginList() {
    return this.medicineService.getMedicineOriginList().subscribe(medicineOriginList => {
      this.medicineOriginList = medicineOriginList;
    });
  }

  /**
   * this function use to get all medicine unit
   *
   * @Author LongNH
   * @Time 19:00 03/07/2022
   */
  public getMedicineUnitList() {
    return this.medicineService.getMedicineUnitList().subscribe(medicineUnitList => {
      this.medicineUnitList = medicineUnitList;
    });
  }

  /**
   * this function use to get all medicine conversion unit
   *
   * @Author LongNH
   * @Time 19:00 03/07/2022
   */
  public getMedicineConversionUnitList() {
    return this.medicineService.getMedicineConversionUnitList().subscribe(medicineConversionUnitList => {
      this.medicineConversionUnitList = medicineConversionUnitList;
    });
  }

  /**
   * this function use to create new medicine
   *
   * @Author LongNH
   * @Time 19:00 03/07/2022
   */
  createMedicine() {
    if (this.medicineCreateForm.valid) {
      this.nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      this.fileRef = this.storage.ref(this.nameImg);
      this.storage.upload(this.nameImg, this.selectedImage).snapshotChanges().pipe(finalize(() => {
        this.fileRef.getDownloadURL().subscribe(url => {
          this.fireBaseURL = url;
          this.medicineCreateForm.patchValue({medicineImage: this.fireBaseURL});
          this.medicineService.createMedicine(this.medicineCreateForm.value).subscribe(() => {
            alert('Created was successful !');
            // this.route.navigateByUrl('/');
          });
        });
      })).subscribe();
    }
  }

  /**
   * this function use to get current date time
   *
   * @Author LongNH
   * @Time 19:00 03/07/2022
   */
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  /**
   * this function use to display image before create on view
   *
   * @Author LongNH
   * @Time 19:00 03/07/2022
   */
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.previewImage = event.target.result;
      };
    }
  }
}
