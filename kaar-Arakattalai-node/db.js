const mysql = require("mysql2/promise");
require('dotenv').config();

// Database configuration with fallback options
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ktglobal',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  acquireTimeout: 30000, // Reduced from 60000
  timeout: 30000, // Reduced from 60000
  reconnect: true,
  charset: 'utf8mb4',
  // Additional connection options for better reliability
  connectTimeout: 30000,
  acquireTimeout: 30000,
  timeout: 30000,
  // SSL configuration for AWS RDS (if needed)
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test the connection with better error handling
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    console.log('📊 Connection details:', {
      host: dbConfig.host,
      database: dbConfig.database,
      port: dbConfig.port
    });
    connection.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.log('📝 Please check your database configuration:');
    console.log('   - Make sure MySQL server is running');
    console.log('   - Check your .env file or update db.js with correct credentials');
    console.log('   - Current settings:', {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database,
      port: dbConfig.port
    });
    
    // If connecting to AWS RDS fails, suggest local setup
    if (dbConfig.host.includes('aws') || dbConfig.host.includes('rds')) {
      console.log('💡 AWS RDS connection failed. Consider:');
      console.log('   - Setting up a local MySQL database');
      console.log('   - Creating a .env file with local database settings');
      console.log('   - Example .env file:');
      console.log('     DB_HOST=localhost');
      console.log('     DB_USER=root');
      console.log('     DB_PASSWORD=your_password');
      console.log('     DB_NAME=ktglobal');
      console.log('     DB_PORT=3306');
    }
  }
};

// Test connection on startup
testConnection();

module.exports = pool;