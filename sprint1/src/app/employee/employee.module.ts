import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeCeateComponent} from './employee-ceate/employee-ceate.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EmployeeModalComponent} from './employee-modal/employee-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment.prod';


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeCeateComponent,
    EmployeeEditComponent,
    EmployeeModalComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
]
})

export class EmployeeModule {
}
