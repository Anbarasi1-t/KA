import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SummaryCardDTO {
  label: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:3000/api/summaryCards';

  constructor(private http: HttpClient) {}

  /**
   * ✅ Fetch all cards in one call
   *    GET /api/summaryCards
   */
  getSummaryCards(): Observable<SummaryCardDTO[]> {
    return this.http.get<SummaryCardDTO[]>(`${this.baseUrl}`);
  }

  /**
   * ✅ Individual calls (must match backend routes)
   */
  getRequestsCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/requests`);
  }

  getApprovalsCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/approvals`);
  }

  getRejectedCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/rejected`);
  }

  getScholarshipFormCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/scholarship-form`);
  }

  getAssistanceNgoCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/assistance-ngo`);
  }

  getMedicalAssistanceCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/medical-assistance`);
  }

  getLaptopRequestCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/laptop-request`);
  }

  getCsrAdvancesCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/csr-advances`);
  }
}
