import {Component, OnInit} from '@angular/core';
import {Position} from '../../model/employee/position';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../model/employee/employee';
import {EmployeeService} from '../../service/employee/employee.service';
import {PositionService} from '../../service/employee/position.service';
import {ActivatedRoute, Router} from '@angular/router';

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

  compareWithId(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }

  constructor(private  employeeService: EmployeeService,
              private positionService: PositionService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.employeeFormEdit = new FormGroup({
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


  ngOnInit(): void {
    this.positionService.getAllPosition().subscribe(position => {
      this.position = position;
    });
    this.getEmployeeById(this.id);
  }

  getEmployeeById(id: string) {
    return this.employeeService.findEmployeeById(id).subscribe(employee => {
      this.employeeFormEdit.patchValue(employee);
    });
  }

  onSubmit(id: string) {
    const employee = this.employeeFormEdit.value;
    console.log(employee);
    this.employeeService.updateEmployee(id, employee).subscribe(() => {
      alert('thành công');
    }, error => {
      this.errorUser = error.error.errorMap.usersName;
      console.log(this.errorUser);
      this.errorImage = error.error.errorMap.employeeImage;
      console.log(this.errorImage);
    });
  }

  checkDay() {
    const dayWork = new Date(this.employeeFormEdit.get('employeeDateStart').value);
    const today = Date.now();
    // @ts-ignore
    if (dayWork - today >= 1) {
      console.log('1');
      this.employeeFormEdit.get('employeeDateStart').setErrors({check: true});
    }
  }
}
