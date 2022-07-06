import { Component, OnInit } from '@angular/core';
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  /*
  Created by TamNA
  Time: 12:50:00 03/07/2022
  Function:  Edit Employee
*/
  onSubmit(id: string) {
     if (!this.employeeFormEdit.valid) {
      this.employeeFormEdit.markAllAsTouched();
     }
    const employee = this.employeeFormEdit.value;
    console.log(this.valueEmployee);
    console.log(employee);
    console.log(Object.is(employee.toString(), this.valueEmployee.toString()));
    if (this.employeeFormEdit.valid) {
      if ((this.selectedImage == null && employee.employeeImage.length > 0)) {
        this.employeeService.updateEmployee(id, employee).subscribe(() => {
          this.toastr.success('Chỉnh Sửa Thành Công !', 'Chỉnh sửa nhân viên', {
            timeOut: 3000,
            progressBar: true
          });
          this.router.navigateByUrl('/employee/list');
        });
      } else {
        console.log(employee);
        const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
        const fileRef = this.storage.ref(nameImg);
        this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.employeeFormEdit.patchValue(employee.employeeImage = url);
            console.log(url);
// Call API to update
            this.employeeFormEdit.patchValue(employee.employeeImage = url);
            this.employeeService.updateEmployee(id, employee).subscribe(() => {
              this.toastr.success('Chỉnh Sửa Thành Công !', 'Chỉnh sửa nhân viên', {
                timeOut: 3000,
                progressBar: true
              });
              this.router.navigateByUrl('/employee/list');
            }, error => {
              this.errorUser = error.error.errorMap.usersName;
              console.log(this.errorUser);
              this.errorImage = error.error.errorMap.employeeImage;
              console.log(this.errorImage);
            });
          });
        })).subscribe();
      }
    }
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
      console.log('lớn hơn  ');
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
          this.giveURLtoCreate.emit(this.downloadURL);
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
