import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MedicineType} from '../../model/medicine/medicine-type';
import {MedicineOrigin} from '../../model/medicine/medicine-origin';
import {MedicineUnit} from '../../model/medicine/medicine-unit';
import {MedicineConversionUnit} from '../../model/medicine/medicine-conversion-unit';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MedicineService} from '../../service/medicine/medicine.service';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {Medicine} from '../../model/medicine/medicine';

@Component({
  selector: 'app-medicine-edit',
  templateUrl: './medicine-edit.component.html',
  styleUrls: ['./medicine-edit.component.css']
})
export class MedicineEditComponent implements OnInit {
  medicineEditForm: FormGroup;
  confirmMedicine: Medicine;
  medicineTypeList: MedicineType[];
  medicineOriginList: MedicineOrigin[];
  medicineUnitList: MedicineUnit[];
  medicineConversionUnitList: MedicineConversionUnit[];
  selectedImage: any;
  previewImage: any;
  fileRef: AngularFireStorageReference;
  nameImg: string;
  fireBaseURL: string;
  id?: string;
  submit = false;

  constructor(private route: Router,
              private medicineService: MedicineService,
              private activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.getALlDropDownList();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.getMedicine(this.id);
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
   * this function use to update exist medicine
   *
   * @Author LongNH
   * @Time 19:00 03/07/2022
   */
  updateMedicine() {
    if (this.medicineEditForm.valid) {
      this.nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      this.fileRef = this.storage.ref(this.nameImg);
      this.storage.upload(this.nameImg, this.selectedImage).snapshotChanges().pipe(finalize(() => {
        this.fileRef.getDownloadURL().subscribe(url => {
          this.fireBaseURL = url;
          this.medicineEditForm.patchValue({medicineImage: this.fireBaseURL});
          this.medicineService.createMedicine(this.medicineEditForm.value).subscribe(() => {
            alert('Updated was successful !');
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
   * this function use to display image before update on view
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

  /**
   * this function use to get exist medicine form be
   *
   * @Author LongNH
   * @Time 19:00 03/07/2022
   */
  public getMedicine(id: string) {
    return this.medicineService.findMedicineById(id).subscribe(medicine => {
      this.confirmMedicine = medicine;
      this.syncMedicine();
    });
  }
  /**
   * this function use to sync medicine for display view
   *
   * @Author LongNH
   * @Time 19:00 03/07/2022
   */
  private syncMedicine() {
    this.medicineEditForm = new FormGroup({
      medicineId: new FormControl(this.confirmMedicine.medicineId),
      medicineName: new FormControl(this.confirmMedicine.medicineName),
      medicineActiveIngredients: new FormControl(this.confirmMedicine.medicineActiveIngredients),
      medicineImportPrice: new FormControl(this.confirmMedicine.medicineImportPrice),
      medicineDiscount: new FormControl(this.confirmMedicine.medicineDiscount),
      medicineWholesaleProfit: new FormControl(this.confirmMedicine.medicineWholesaleProfit),
      medicineRetailSaleProfit: new FormControl(this.confirmMedicine.medicineRetailSaleProfit),
      medicineTax: new FormControl(this.confirmMedicine.medicineTax),
      medicineConversionRate: new FormControl(this.confirmMedicine.medicineConversionRate),
      medicineManufacture: new FormControl(this.confirmMedicine.medicineManufacture),
      medicineUsage: new FormControl(this.confirmMedicine.medicineUsage),
      medicineInstruction: new FormControl(this.confirmMedicine.medicineInstruction),
      medicineAgeApproved: new FormControl(this.confirmMedicine.medicineAgeApproved),
      medicineImage: new FormControl(this.confirmMedicine.medicineImage),
      medicineDescription: new FormControl(this.confirmMedicine.medicineDescription),
      medicineOrigin: new FormControl(this.confirmMedicine.medicineOrigin),
      medicineType: new FormControl(this.confirmMedicine.medicineType),
      medicineUnit: new FormControl(this.confirmMedicine.medicineUnit),
      medicineConversionUnit: new FormControl(this.confirmMedicine.medicineConversionUnit)
    });
  }
  /**
   * this function use to sync medicine for display view
   *
   * @Author LongNH
   * @Time 19:00 03/07/2022
   */
  compareFn(t1, t2): boolean {
    return t1 && t2 ? t1.vehicleType === t2.vehicleType : t1 === t2;
  }
}
