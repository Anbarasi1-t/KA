const express = require('express');
const router = express.Router();
const {
  getAllCount,
  getApprovedCount,
  getInProgressCount,
  getRejectedCount
} = require('../controllers/summaryconscontroller');

router.get('/all', getAllCount);
router.get('/approved', getApprovedCount);
router.get('/inprogress', getInProgressCount);
router.get('/rejected', getRejectedCount);

module.exports = router;