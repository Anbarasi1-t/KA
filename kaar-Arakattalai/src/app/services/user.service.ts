import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile {
  profilePicture: string;
  name: string;
  aid: number;
  designation: string;
  manager: string;
  annualContribution: number;
  annualEligibleReferral: number;
  balanceEligibleReferral: number;
  myReferrals: number;
  
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user/profile';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrl);
  }
}
