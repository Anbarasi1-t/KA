// routes/adminTableRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminTableController');

// GET all employee referral rows
// Endpoint: GET /api/admin/employees
router.get('/employees', controller.getAllEmployeeRequests);

module.exports = router;
