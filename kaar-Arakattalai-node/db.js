const mysql = require("mysql2/promise");
require('dotenv').config();

// Option 1: MySQL2 with Connection Pool (Recommended)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'rds-us-east-qual-cluster.cluster-ctjsfm405llz.us-east-1.rds.amazonaws.com',
  user: process.env.DB_USER || 'gaiswarya',
  password: process.env.DB_PASSWORD || '55mlqpZ7Iyr4',
  database: process.env.DB_NAME || 'ktglobal',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  charset: 'utf8mb4'
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    console.log('📝 Please check your database configuration:');
    console.log('   - Make sure MySQL/SQLYog is running');
    console.log('   - Check your .env file or update db.js with correct credentials');
    console.log('   - Current settings:', {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      database: process.env.DB_NAME || 'ktglobal',
      port: process.env.DB_PORT || 3306
    });
  } else {
    console.log('✅ Database connected successfully!');
    connection.release();
  }
});

module.exports = pool;