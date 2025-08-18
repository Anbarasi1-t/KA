// routes/admintableRoutes.js
const express = require('express');
const router = express.Router();
const { getAllEmployeeRequests } = require('../controllers/admintableController');

// GET all employee referral rows
router.get('/employees', getAllEmployeeRequests);

module.exports = router;
