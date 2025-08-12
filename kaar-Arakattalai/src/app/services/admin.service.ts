import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SummaryCardDTO {
  label: string;
  count: number;
}

/**
 * AdminService
 * - getSummaryCards(): preferred single call that returns all cards
 * - getXCount(): convenience methods kept for backwards compatibility
 */
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // match your backend routing; controller/routes you posted use '/api/summary-cards'
  private baseUrl = 'http://localhost:5000/api/summary-cards';

  constructor(private http: HttpClient) {}

  // Preferred single call returning all cards
  getSummaryCards(): Observable<SummaryCardDTO[]> {
    return this.http.get<SummaryCardDTO[]>(`${this.baseUrl}`);
  }

  // Convenience single-count endpoints (keeps older components/tests working)
  getRequestsCount(): Observable<number> { return this.http.get<number>(`${this.baseUrl}/requests`); }
  getApprovalsCount(): Observable<number> { return this.http.get<number>(`${this.baseUrl}/approvals`); }
  getRejectedCount(): Observable<number> { return this.http.get<number>(`${this.baseUrl}/rejected`); }
  getScholarshipFormCount(): Observable<number> { return this.http.get<number>(`${this.baseUrl}/scholarship-form`); }
  getAssistanceNgoCount(): Observable<number> { return this.http.get<number>(`${this.baseUrl}/assistance-ngo`); }
  getMedicalAssistanceCount(): Observable<number> { return this.http.get<number>(`${this.baseUrl}/medical-assistance`); }
  getLaptopRequestCount(): Observable<number> { return this.http.get<number>(`${this.baseUrl}/laptop-request`); }
  getCsrAdvancesCount(): Observable<number> { return this.http.get<number>(`${this.baseUrl}/csr-advances`); }
}
