import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Prescription} from '../../models/prescription/prescription';
import {PrescriptionDetail} from '../../models/prescription/prescription-detail';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(private http: HttpClient) { }

  getAllPrescription(page: number, id: string, names: string, target: string, symptom: string): Observable<Prescription[]> {
    return this.http.get<Prescription[]>('http://localhost:8080/api/manager-prescription/prescriptions?page=' +
      `${page}` + '&id=' + `${id}` + '&names=' + `${names}` + '&target=' + `${target}` + '&symptom=' + `${symptom}`);
  }

  createPrescription(prescription): Observable<Prescription> {
    return this.http.post<Prescription>('http://localhost:8080/api/manager-prescription/prescriptions', prescription);
  }

  getPrescriptionById(id: string): Observable<PrescriptionDetail[]> {
    return this.http.get<PrescriptionDetail[]>('http://localhost:8080/api/manager-prescription/prescriptions/' + `${id}`);
  }

  deletePrescription(ids: string): Observable<Prescription> {
    return this.http.delete<Prescription>('http://localhost:8080/api/manager-prescription/prescriptions/' + `${ids}`);
  }
}
