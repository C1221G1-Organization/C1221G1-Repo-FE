import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from '../../service/employee/employee.service';
import {PositionService} from '../../service/employee/position.service';
import {Router} from '@angular/router';
import {Employee} from '../../model/employee/employee';
import {Position} from '../../model/employee/position';
import {FormControl, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-employee-ceate',
  templateUrl: './employee-ceate.component.html',
  styleUrls: ['./employee-ceate.component.css']
})
export class EmployeeCeateComponent implements OnInit {
  employeeFormCreate: FormGroup;
  employee: Employee[] = [];
  position: Position[] = [];
  errorUser: string;
  errorImage: string;
  selectedImage: any = null;

  constructor(private  employeeService: EmployeeService,
              private positionService: PositionService,
              private router: Router) {
    this.employeeFormCreate = new FormGroup({
      employeeId: new FormControl('Auto save'),
      // tslint:disable-next-line:max-line-length
      employeeName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ][\\s\\S]*$')]),
      employeeImage: new FormControl('', [Validators.required]),
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

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }



  ngOnInit(): void {
    this.positionService.getAllPosition().subscribe(position => {
      this.position = position;
    });
  }

  onSubmit() {
    const employee = this.employeeFormCreate.value;
    console.log(employee);
    this.employeeService.saveEmployee(employee).subscribe(() => {
      alert('thành công');
    }, error => {
      this.errorUser = error.error.errorMap.usersName;
      console.log(this.errorUser);
      this.errorImage = error.error.errorMap.employeeImage;
      console.log(this.errorImage);
    });
  }

  checkDay() {
    const dayWork = new Date(this.employeeFormCreate.get('employeeDateStart').value);
    const today = Date.now();
    // @ts-ignore
    if (dayWork - today >= 1) {
      console.log('11');
      this.employeeFormCreate.get('employeeDateStart').setErrors({check: true});
    }
  }
}
