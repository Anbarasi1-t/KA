// src/app/services/treasurybar.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TreasurybarService {
  // ✅ Direct backend URL with localhost:3000
  private apiUrl = 'http://localhost:3000/api/treasurybar';

  constructor(private http: HttpClient) {}

  // ✅ Call both endpoints and combine into one object
  getCounts(): Observable<{ pending: number; completed: number }> {
    return forkJoin({
      pending: this.http.get<number>(`${this.apiUrl}/pending`),
      completed: this.http.get<number>(`${this.apiUrl}/completed`)
    }).pipe(
      map((results) => ({
        pending: results.pending,
        completed: results.completed
      }))
    );
  }
}
