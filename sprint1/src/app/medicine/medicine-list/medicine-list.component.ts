import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MedicineService} from '../../service/medicine/medicine.service';
import {MedicineDto} from '../../model/medicine/medicine-dto';

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
  @ViewChild('columName') columName: ElementRef;
  @ViewChild('condition') condition: ElementRef;
  @ViewChild('keyWord') keyWord: ElementRef;


  constructor(private medicineService: MedicineService) {
  }

  ngOnInit(): void {
    this.medicineService.searchListMedicine('medicineId', 'like', '%%').subscribe(medicines => {
      this.medicines = medicines['content'];
      console.log(this.medicines);
    });
  }

  deleteModal(name: string, id: string) {
    this.nameToDelete = name;
    this.idToDelete = id;
  }

  deleteMedicineById() {
    this.medicineService.deleteMedicineById(this.idToDelete).subscribe(() => {
        this.ngOnInit();
      }
    );
  }

  searchMedicine() {
    // if (this.columName.nativeElement.value == )
    this.medicineService.searchListMedicine(this.columName.nativeElement.value,
      this.condition.nativeElement.value, this.keyWord.nativeElement.value).subscribe(medicines => {
      this.medicines = medicines;
    });
  }

  getValueMedicine(medicine: MedicineDto) {
    this.getMedicine = medicine;
  }

  getInfoMedicine(medicineId: any) {
    for (let i = 0; i < this.medicines.length; i++) {
      if (medicineId === this.medicines[i].medicineId) {
        this.infoMedicine = this.medicines[i];
        break;
      }
    }
  }
}
