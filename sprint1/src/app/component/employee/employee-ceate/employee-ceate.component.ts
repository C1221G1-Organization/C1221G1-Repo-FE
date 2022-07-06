import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Employee} from "../../../model/employee/employee";

@Component({
  selector: 'app-employee-ceate',
  templateUrl: './employee-ceate.component.html',
  styleUrls: ['./employee-ceate.component.css']
})
export class EmployeeCeateComponent implements OnInit {


  constructor() { }

  employeeFormCreate: FormGroup;
  employee: Employee[] = [];
  position: Position[] = [];
  errorUser: string;
  errorImage: string;
  selectedImage: any = null;
  downloadURL: string;
  listIMG: Array<string> = [];
  myMap = new Map();
  checkUploadAvatar = false;
  giveURLtoCreate = new EventEmitter<string>();
  selectedFile: File;

  ngOnInit(): void {
  }

}
