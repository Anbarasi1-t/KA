# KAAR Arakattalai Backend

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Configuration

#### Option A: Local MySQL Database (Recommended for Development)
1. Install MySQL on your machine
2. Create a database named `ktglobal`
3. Create a `.env` file in the root directory with the following content:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=ktglobal
DB_PORT=3306
PORT=3000
```

#### Option B: AWS RDS (Production)
If you have access to the AWS RDS instance, create a `.env` file with:

```env
DB_HOST=rds-us-east-qual-cluster.cluster-ctjsfm405llz.us-east-1.rds.amazonaws.com
DB_USER=gaiswarya
DB_PASSWORD=55mlqpZ7Iyr4
DB_NAME=ktglobal
DB_PORT=3306
DB_SSL=true
PORT=3000
```

### 3. Start the Server
```bash
npm start
```

## Troubleshooting

### Database Connection Issues
- Make sure MySQL server is running
- Check your `.env` file configuration
- Verify database credentials
- For AWS RDS: Ensure your IP is whitelisted in security groups

### Common Errors
- `ETIMEDOUT`: Database server is not accessible
- `ECONNREFUSED`: Database server is not running
- `ER_ACCESS_DENIED_ERROR`: Incorrect username/password

## API Endpoints

- `/api/referrals` - Referral management
- `/api/contributions` - Contribution management
- `/api/totalcontributions` - Total contributions
- `/api/summarycons` - Summary consultations
- `/api/user` - User management
- `/api/employees` - Employee management
- `/api/summaryCards` - Summary cards
- `/api/updatecontribution` - Update contributions
