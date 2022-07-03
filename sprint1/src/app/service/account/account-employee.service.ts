import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountEmployee} from "../../model/account/accountEmployee";
import {EditAccountEmployeeDto} from "../../model/account/edit-account-employee-dto";

const API_URL = "http://localhost:8080/api/manager-account/account";

@Injectable({
  providedIn: 'root'
})
export class AccountEmployeeService {

  constructor(private http: HttpClient) {
  }

  getAllAccountEmployee(id: string, name: string , position: string,username: string , page: number): Observable<any> {
    return this.http.get<any>(
      API_URL +  '?&id=' + id + '&name=' + name + '&position=' + position + '&username=' + username + '&page=' + page  );
  }

  findAccountEmployeeById(id: string): Observable<EditAccountEmployeeDto> {
    return this.http.get<EditAccountEmployeeDto>(API_URL+ '/' + id);
  }

  update(id: string, account: EditAccountEmployeeDto): Observable<EditAccountEmployeeDto> {
    return this.http.put<EditAccountEmployeeDto>(API_URL + '/updateAccount' + '?id=' + id, account);
  }


}
