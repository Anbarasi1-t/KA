import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContributionPayload {
  fy: string;
  month: string;
  amount: number;
  transferType: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContributionService {
  private apiUrl = 'http://localhost:3000/api/contributions'; // adjust if needed

  constructor(private http: HttpClient) {}

  saveContribution(data: ContributionPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  getContributions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }
}
