import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmployeeRequest {
  id: string;
  employeeName: string;
  employeeAID: string | number;
  referralType: string;
  annualContribution: number;
  amountRequested: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminTableService {

  // ✅ Point this to your backend API
  private readonly apiUrl = 'http://localhost:3000/api/employees';


  constructor(private http: HttpClient) { }

  // ✅ This matches what your component expects
  getEmployees(): Observable<EmployeeRequest[]> {
    return this.http.get<EmployeeRequest[]>(this.apiUrl);
  }
}

