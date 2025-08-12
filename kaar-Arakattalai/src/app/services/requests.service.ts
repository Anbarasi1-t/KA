import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) {}

  getRequests(): Observable<any[]> {
    // MUST match the backend route
    return this.http.get<any[]>('http://localhost:3000/api/referrals');
  }
  getTotalContribution(): Observable<any> {
    return this.http.get<number>('http://localhost:3000/api/totalcontributions');
  }

  // Summary counts methods
  getAllCount(): Observable<number> {
    return this.http.get<number>('http://localhost:3000/api/summarycons/all');
  }

  getApprovedCount(): Observable<number> {
    return this.http.get<number>('http://localhost:3000/api/summarycons/approved');
  }

  getInProgressCount(): Observable<number> {
    return this.http.get<number>('http://localhost:3000/api/summarycons/inprogress');
  }

  getRejectedCount(): Observable<number> {
    return this.http.get<number>('http://localhost:3000/api/summarycons/rejected');
  }
}
