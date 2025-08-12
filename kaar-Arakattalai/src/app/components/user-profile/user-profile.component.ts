// import { Component } from '@angular/core'; 
// import { CommonModule } from '@angular/common';

// @Component({
//   standalone: true,
//   selector: 'app-user-profile',
//   imports: [CommonModule],
//   template: `
//     <div class="profile-card">
//       <img src="assets/profile_picture.png" alt="Profile Picture" class="profile-img" />
//       <div class="info">
//         <div class="row">
//           <div>
//             <div class="label">Name</div>
//             <div class="value">Vineeth Rajendran</div>
//           </div>
//           <div>
//             <div class="label">AID</div>
//             <div class="value">50</div>
//           </div>
//         </div>

//         <div class="row">
//           <div>
//             <div class="label">Designation</div>
//             <div class="value">Professional</div>
//           </div>
//           <div>
//             <div class="label">Direct Manager</div>
//             <div class="value">Srinivasan Subbiah</div>
//           </div>
//         </div>

//         <div class="row">
//           <div>
//             <div class="label">Annual Contribution (For Current FY)</div>
//             <div class="value">100000</div>
//           </div>
//           <div>
//             <div class="label">Annual Eligible Referral Amount</div>
//             <div class="value">200000</div>
//           </div>
//         </div>

//         <div class="row">
//           <div>
//             <div class="label">Balance Eligible Referral Amount</div>
//             <div class="value">20000</div>
//           </div>
//           <div>
//             <div class="label">My Referrals</div>
//             <div class="value">0</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .profile-card {
//       max-width: 300px;

//       padding: 24px;
//       background: white;
//       border-radius: 16px;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//       text-align: center;
//       font-family: 'DM Sans', sans-serif;
//     }

//     .profile-img {
//       width: 120px;
//       height: 120px;
//       border-radius: 50%;
//       object-fit: cover;
//       margin-bottom: 16px;
//       border: 4px solid #f1f1f1;
//     }

//     .info {
//       display: flex;
//       flex-direction: column;
//       gap: 16px;
//     }

//     .row {
//       display: flex;
//       justify-content: space-between;
//       gap: 16px;
//       flex-wrap: wrap;
//     }

//     .label {
//       font-size: 12px;
//       color: gray;
//     }

//     .value {
//       font-size: 14px;
//       font-weight: 600;
//       color: #333;
//     }

//     @media (max-width: 480px) {
//       .row {
//         flex-direction: column;
//         text-align: left;
//       }
//     }
//   `]
// })
// export class UserProfileComponent { }
import { Component, OnInit } from '@angular/core';
import { UserService, UserProfile } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-user-profile',
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="profile-container" *ngIf="user">
      <img class="profile-image" [src]="user.profilePicture" alt="Profile Picture">
      <div class="info-grid">
        <div><strong>{{ user.name }}</strong><div>Name</div></div>
        <div><strong>{{ user.aid }}</strong><div>AID</div></div>
        <div><strong>{{ user.designation }}</strong><div>Designation</div></div>
        <div><strong>{{ user.manager }}</strong><div>Direct Manager</div></div>
        <div><strong>{{ user.annualContribution }}</strong><div>Annual Contribution <br>(For Current FY)</div></div>
        <div><strong>{{ user.annualEligibleReferral }}</strong><div>Annual Eligible <br>Referral Amount</div></div>
        <div><strong>{{ user.balanceEligibleReferral }}</strong><div>Balance Eligible <br>Referral Amount</div></div>
        <div><strong>{{ user.myReferrals }}</strong><div>My Referrals</div></div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      width: 330px;
      height: 100%;
      margin: 0;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #e0e0e0;
      /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
      text-align: center;
      background-color: #fff;
    }
    .profile-image {
      width: 140px;
      height: 140px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 3rem;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem 5rem;
      text-align: left;
      margin-left: 0;
    
      div {
        strong {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #272A47;
        }
        div {
          font-size: 12px;
          color: #7D838B;
        }
      }
    }
    @media (max-width: 480px) {
      .info-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class UserProfileComponent implements OnInit {
  user!: UserProfile;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe(data => {
      this.user = data;
    });
  }
}

