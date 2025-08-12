// admin.service.ts
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
export class AdminService {
  // Adjust port if needed
  private baseUrl = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeRequest[]> {
    return this.http.get<EmployeeRequest[]>(`${this.baseUrl}/employees`);
  }

  // other endpoints (e.g., update, delete) can be added here
}
