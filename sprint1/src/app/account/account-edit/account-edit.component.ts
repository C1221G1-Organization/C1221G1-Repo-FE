import {Component, OnInit} from '@angular/core';
import {AccountEmployee} from "../../model/account/accountEmployee";
import {AccountEmployeeService} from "../../service/account/account-employee.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Position} from "../../model/employee/position";
import {PositionService} from "../../service/employee/position.service";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  updateForm: FormGroup;
  id: string;
  positions: Position [];


  constructor(private accountEmployeeService: AccountEmployeeService,
              private positionService: PositionService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id')
      this.accountEmployeeService.findAccountEmployeeById(this.id).subscribe(account => {
        this.updateForm = new FormGroup({
          employeeId: new FormControl(account.employeeId),
          employeeName: new FormControl(account.employeeName),
          position: new FormControl(account.position),
          username: new FormControl(account.username),
          password: new FormControl(''),
        })
      });
    })

  }



  // **
  //  * create by HaiNX
  //  * time: 03/06/2022
  //  * get list position
  //  *
  ngOnInit(): void {
    this.positionService.getAllPosition().subscribe(position => {
      this.positions = position;
    })
  }


  // **
  //  * create by HaiNX
  //  * time: 03/06/2022
  //  * update account
  //  *
  update(id: string) {
    const account = this.updateForm.value;
    this.accountEmployeeService.update(id,account).subscribe(()=> {
      alert('Cập nhật thành công');
      this.router.navigateByUrl('/account/list')
    });

  }
}
