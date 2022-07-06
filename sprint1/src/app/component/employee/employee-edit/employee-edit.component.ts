import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {Employee} from '../../../model/employee/employee';
import {Position} from '../../../model/employee/position';
import {EmployeeService} from '../../../service/employee/employee.service';
import {PositionService} from '../../../service/employee/position.service';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  id: string;
  employeeFormEdit: FormGroup;
  employee: Employee[] = [];
  position: Position[] = [];
  errorUser: string;
  errorImage: string;
  employeeImage: string;
  selectedImage: any = null;

  downloadURL: string;
  listIMG: Array<string> = [];
  myMap = new Map();
  checkUploadAvatar = false;
  giveURLtoCreate = new EventEmitter<string>();
  selectedFile: File;

  compareWithId(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }

  constructor(private  employeeService: EmployeeService,
              private positionService: PositionService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.employeeFormEdit = new FormGroup({
      employeeId: new FormControl('Auto save'),
      // tslint:disable-next-line:max-line-length
      employeeName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ][\\s\\S]*$')]),
      employeeImage: new FormControl('', [Validators.required, Validators.pattern('(\\S.*\\.(?:png$|jpg$))')]),
      // tslint:disable-next-line:max-line-length
      employeeAddress: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ][\\s\\S]*$')]),
      // tslint:disable-next-line:max-line-length
      employeePhone: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
      employeeDateStart: new FormControl('', [Validators.required]),
      employeeNote: new FormControl(''),
      flag: new FormControl(''),
      position: new FormControl('', [Validators.required]),
      employeeUsername: new FormGroup({
        // tslint:disable-next-line:max-line-length
        username: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')])),
        password: new FormControl(''),
        flag: new FormControl('')
      })
    });
  }

  /*
    Created by TamNA
    Time: 11:50:00 03/07/2022
    Function:  Show position
*/
  ngOnInit(): void {
    this.positionService.getAllPosition().subscribe(position => {
      this.position = position;
    });
    this.getEmployeeById(this.id);
  }

  /*
    Created by TamNA
    Time: 13:50:00 03/07/2022
    Function:  Get employee by id
*/
  getEmployeeById(id: string) {
    return this.employeeService.findEmployeeById(id).subscribe(employee => {
      // lấy hình ảnh và gắn lên cho employeeImage
      this.employeeImage = employee.employeeImage;
      console.log(this.employeeImage);
      this.employeeFormEdit.patchValue(employee);
    });
  }

  /*
    Created by TamNA
    Time: 12:50:00 03/07/2022
    Function:  Show image
*/

  showPreview(event: any) {

    if (event.target.files && event.target.files[0]) {
      // tslint:disable-next-line:prefer-const
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.selectedImage = event.target.files[0];
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.downloadURL = this.displayEmployeeImage();
      };
    }
    this.employeeImage = '';
  }

  /*
  Created by TamNA
  Time: 12:50:00 03/07/2022
  Function:  Edit Employee
*/
  onSubmit(id: string) {
    const employee = this.employeeFormEdit.value;
    console.log(employee);
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(url => {
        this.employeeFormEdit.patchValue(employee.employeeImage = url);
        console.log(url);
// Call API to update
        this.employeeService.updateEmployee(id, employee).subscribe(() => {
          alert('thành công');
        }, error => {
          this.errorUser = error.error.errorMap.usersName;
          console.log(this.errorUser);
          this.errorImage = error.error.errorMap.employeeImage;
          console.log(this.errorImage);
        });
      });
    })).subscribe();
  }

  /*
  Created by TamNA
  Time: 18:50:00 03/07/2022
  Function:  check Date start of employee
*/
  checkDay() {
    const dayWork = new Date(this.employeeFormEdit.get('employeeDateStart').value);
    const today = Date.now();
    // @ts-ignore
    if (dayWork - today >= 1) {
      console.log('1');
      this.employeeFormEdit.get('employeeDateStart').setErrors({check: true});
    }
  }

  /*
Created by TamNA
Time: 12:50:00 03/07/2022
Function:  show Time Now
*/
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  /*
Created by TamNA
Time: 12:50:00 03/07/2022
Function:  Show image on firebase
*/
  displayEmployeeImage() {
    this.checkUploadAvatar = true;
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.downloadURL = url;
          this.checkUploadAvatar = false;
          this.listIMG.push(url);
          console.log('LIST ==> ', this.listIMG);
          for (let i = 0; i < this.listIMG.length; i++) {
            this.myMap.set(i, this.listIMG[i]);
          }
          console.log('map ---> ', this.myMap);
        });
      })).subscribe();
  }
}
