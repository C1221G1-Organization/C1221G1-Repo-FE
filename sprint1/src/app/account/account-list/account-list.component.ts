import {Component, OnInit} from '@angular/core';
import {AccountEmployee} from "../../model/account/accountEmployee";
import {AccountEmployeeService} from "../../service/account/account-employee.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accountEmployeeList: AccountEmployee [] = [];
  page = 0;
  name = '';
  id = '';
  username = '';
  position = '';
  public activeProjectIndex: number;
  idClick = '';
  totalPages = 0;
  pageSize: 0;
  firsts = false;
  last = false;
  flag = false;
  message: boolean;
  searchForm: FormGroup;
  collection: any[] = this.accountEmployeeList;


  constructor(private accountEmployeeService: AccountEmployeeService,
              private  router: Router) {
    this.searchForm = new FormGroup({
      typeSearch: new FormControl(''),
      inputSearch: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.accountEmployeeService.getAllAccountEmployee(
      this.id = '', this.name = '', this.position = '', this.username = '', this.page).subscribe
    ((data: any) => {
      this.accountEmployeeList = data.content;
      this.page = data.number;
      this.totalPages = data.totalPages;
      this.firsts = data.first;
      this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElemnts;
    }, error => {
    });
    this.message = false;
  }

  previous() {
    if (this.page > 0) {
      this.accountEmployeeService.getAllAccountEmployee(this.id, this.name , this.position,this.username, this.page - 1).subscribe(
        (data: any) => {
          this.accountEmployeeList = data.content;
          this.page = data.number;
          this.firsts = data.first;
          this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
        }, err => {
          console.log(err);
        }
      );
    }
  }

  next() {
    if (this.page < this.totalPages - 1) {
      this.accountEmployeeService.getAllAccountEmployee(this.id, this.name , this.position,this.username, this.page + 1).subscribe(
        data => {
          this.accountEmployeeList = data.content;
          this.page = data.number;
          this.firsts = data.first;
          this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
        }, err => {
          console.log(err);
        }
      );
    }
  }



  search() {
    const input = this.searchForm.get('inputSearch').value;
    const type = this.searchForm.get('typeSearch').value;

    if (type === 'id' && input.trim() !== '') {
      this.accountEmployeeService.getAllAccountEmployee(this.id = input.trim(), this.name = '', this.position = '', this.username = '', this.page ).subscribe
      ((data: any) => {
        console.log(data.content);
        this.message = false;
        this.accountEmployeeList = data.content;
        this.page = data.number;
        this.totalPages = data.totalPages;
        this.firsts = data.first;
        this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
      }, error => {
        this.message = true;
        this.accountEmployeeList = null;
        this.page = 0;
        this.totalPages = 0;
        console.log(error)
      });
    } else if (type === 'username' && input.trim() !== '') {
      this.accountEmployeeService.getAllAccountEmployee(this.id = '' , this.name =  '', this.position = '', this.username = input.trim(), this.page ).subscribe
      ((data: any) => {
        this.message = false;
        this.accountEmployeeList = data.content;
        this.page = data.number;
        this.totalPages = data.totalPages;
        this.firsts = data.first;
        this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
      }, error => {
        this.message = true;
        this.accountEmployeeList = null;
        this.page = 0;
        this.totalPages = 0;
      });
    } else if (type === 'name' && input.trim() !== '') {
      this.accountEmployeeService.getAllAccountEmployee(this.id = '' , this.name = input.trim(), this.position = '', this.username = '', this.page).subscribe
      ((data: any) => {
        this.message = false;
        this.accountEmployeeList = data.content;
        this.page = data.number;
        this.totalPages = data.totalPages;
        this.firsts = data.first;
        this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
      }, error => {
        this.message = true;
        this.accountEmployeeList = null;
        this.page = 0;
        this.totalPages = 0;
      });
    }else if (type === 'position' && input.trim() !== '') {
      this.accountEmployeeService.getAllAccountEmployee(this.id = '', this.name = '', this.position = input.trim(), this.username = '' , this.page).subscribe
      ((data: any) => {
        this.message = false;
        this.accountEmployeeList = data.content;
        this.page = data.number;
        this.totalPages = data.totalPages;
        this.firsts = data.first;
        this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
      }, error => {
        this.message = true;
        this.accountEmployeeList = null;
        this.page = 0;
        this.totalPages = 0;
      });
    } else if (input.trim() == '') {
      this.accountEmployeeService.getAllAccountEmployee(
        this.id = '', this.name = '', this.position = '', this.username = '', this.page).subscribe
      ((data: any) => {
        this.message = false;
        this.accountEmployeeList = data.content;
        this.page = data.number;
        this.totalPages = data.totalPages;
        this.firsts = data.first;
        this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
      }, error => {
        this.message = true;
      });
    }
  }

  public activeProject(index: number, account: AccountEmployee): void {
    if (this.activeProjectIndex != index){
      this.flag = true;
    }else{
      this.flag = !this.flag;
    }
    this.activeProjectIndex = index;
    if (this.flag == true){
      this.idClick = account.employeeId;
    }else{
      this.idClick = '';
    }
  }

  clickEdit(sucessButton: HTMLButtonElement) {
    if (this.idClick) {
      this.router.navigate(['/account/update/', this.idClick]);
    } else {
      sucessButton.click();
    }
  }
}
