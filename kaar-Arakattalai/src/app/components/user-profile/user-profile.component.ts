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
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService, UserProfile } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UpdateContributionComponent } from '../update-contribution/update-contribution.component';

@Component({
  standalone: true,
  selector: 'app-user-profile',
  imports: [CommonModule, HttpClientModule, UpdateContributionComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  @Output() contributionsRefreshed = new EventEmitter<void>();
  
  user!: UserProfile;
  showUpdateModal: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfile().subscribe(data => {
      this.user = data;
    });
  }

  openUpdateModal() {
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
  }

  onContributionUpdated() {
    // Refresh user profile data after contribution update
    this.loadUserProfile();
    // Emit event to notify parent component to refresh contributions table
    this.contributionsRefreshed.emit();
  }
}

