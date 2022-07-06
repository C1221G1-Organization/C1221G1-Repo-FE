import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MedicineService} from '../../../service/medicine/medicine.service';
import {MedicineDto} from '../../../model/medicine/medicine-dto';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
  public medicines: MedicineDto[];
  nameToDelete: string;
  idToDelete: string;
  getMedicine: MedicineDto;
  infoMedicine: MedicineDto;
  p = 0;
  chosenIndex: number;
  isChosen: boolean;
  chooseId: string;

  @ViewChild('columName') columName: ElementRef;
  @ViewChild('condition') condition: ElementRef;
  @ViewChild('keyWord') keyWord: ElementRef;


  constructor(private medicineService: MedicineService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.medicineService.searchListMedicine('medicineId', 'like', '%%').subscribe(medicines => {
      if (medicines != null) {
        this.medicines = medicines;
        console.log(this.medicines);
      } else {
        this.medicines = [];
      }
    });
  }

  /**
   * this function use to delete modal
   *
   * @Author MyC
   * @Time 10:00 04/07/2022
   */

  deleteModal(name: string, id: string) {
    this.nameToDelete = name;
    this.idToDelete = id;
  }

  /**
   * this function use to delete medicine
   *
   * @Author MyC
   * @Time 10:00 04/07/2022
   */
  deleteMedicineById() {
    this.medicineService.deleteMedicineById(this.idToDelete).subscribe(() => {
        this.toastr.warning('Đã xóa Thành Công !', 'Thông Báo Xác Nhận', {
          timeOut: 2000,
          progressBar: true
        });
        this.ngOnInit();
      }
    );
  }

  /**
   * this function use to search medicine
   *
   * @Author MyC
   * @Time 10:00 04/07/2022
   */
  searchMedicine() {
    const colNameSearch = this.columName.nativeElement.value;
    const conditionSearch = this.condition.nativeElement.value;
    const keyWordSearch = this.keyWord.nativeElement.value;

    if (colNameSearch === 'medicineId' || colNameSearch === 'medicineTypeName' ||
      colNameSearch === 'medicineName' || colNameSearch === 'medicineActiveIngredients') {
      this.medicineService.searchListMedicine(colNameSearch,
        'like', '%27%25' + keyWordSearch + '%25%27').subscribe(medicines => {
        if (medicines != null) {
          console.log(medicines);
          this.medicines = medicines;
        } else {
          this.medicines = [];
        }
      });
    } else if ((colNameSearch === 'medicineImportPrice' || colNameSearch === 'wholesalePrice' || colNameSearch === 'retailPrice')
      && !isNaN(keyWordSearch)) {
      this.medicineService.searchListMedicine(colNameSearch,
        conditionSearch, keyWordSearch).subscribe(medicines => {
        if (medicines != null) {
          console.log(medicines);
          this.medicines = medicines;
        } else {
          this.medicines = [];
        }
      });
    }
  }

  /**
   * this function use to choose index medicine
   *
   * @Author MyC
   * @Time 10:00 04/07/2022
   */

  getValueMedicine(index: number, medicineId: string, medicine: MedicineDto): void {
    if (this.chosenIndex !== index) {
      this.isChosen = true;
      this.chosenIndex = index;
      this.chooseId = medicineId;
    } else {
      this.isChosen = false;
      this.chooseId = null;
    }
    if (this.isChosen) {
      this.getMedicine = medicine;
      this.toastr.success('Xác Nhận Đã Chọn ' + this.getMedicine.medicineName, 'Thông Báo Xác Nhận', {
        timeOut: 3000,
        progressBar: true,
      });
    }
  }


  /**
   * this function use to get info medicine
   *
   * @Author MyC
   * @Time 10:00 04/07/2022
   */
  getInfoMedicine(medicineId: any) {
    for (let i = 0; i < this.medicines.length; i++) {
      if (medicineId === this.medicines[i].medicineId) {
        this.infoMedicine = this.medicines[i];
        break;
      }
    }
  }
}
