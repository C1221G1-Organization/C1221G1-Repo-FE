import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../service/employee/employee.service';
import {PositionService} from '../../service/employee/position.service';
import {Router} from '@angular/router';
import {Employee} from '../../model/employee/employee';
import {Position} from '../../model/employee/position';
import {FormControl, FormGroup} from '@angular/forms';
import {Users} from '../../model/users';

@Component({
  selector: 'app-employee-ceate',
  templateUrl: './employee-ceate.component.html',
  styleUrls: ['./employee-ceate.component.css']
})
export class EmployeeCeateComponent implements OnInit {
  employeeFormCreate: FormGroup;
  employee: Employee[] = [];
  position: Position[] = [];
  employeeUsername: Users[] = [];

  constructor(private  employeeService: EmployeeService,
              private positionService: PositionService,
              private router: Router) {
    this.employeeFormCreate = new FormGroup({
      employeeId: new FormControl('Auto save'),
      employeeName: new FormControl(''),
      employeeImage: new FormControl(''),
      employeeAddress: new FormControl(''),
      employeePhone: new FormControl(''),
      employeeDateStart: new FormControl(''),
      employeeNote: new FormControl(''),
      flag: new FormControl(''),
      position: new FormControl(''),
      employeeUsername: new FormGroup ({
        username: new FormControl(''),
        password: new FormControl(''),
        flag: new FormControl('')
      })
    });


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
    });


  }
}
