// routes/summarycardsRoutes.js

const express = require('express');
const router = express.Router();
const  {
  getRequestsCount,
  getApprovalsCount,
  getRejectedCount,
  getScholarshipFormCount,
  getAssistanceNgoCount,
  getMedicalAssistanceCount,
  getLaptopRequestCount,
  getCsrAdvancesCount
}= require('../controllers/summarycardsController');

// ✅ Individual counts
router.get('/requests', getRequestsCount);
router.get('/approvals', getApprovalsCount);
router.get('/rejected', getRejectedCount);
router.get('/scholarship-form',getScholarshipFormCount);
router.get('/assistance-ngo',getAssistanceNgoCount);
router.get('/medical-assistance',getMedicalAssistanceCount);
router.get('/laptop-request',getLaptopRequestCount);
router.get('/csr-advances',getCsrAdvancesCount);

module.exports = router;

