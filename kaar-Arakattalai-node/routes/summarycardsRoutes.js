// routes/summaryCards.js
const express = require('express');
const router = express.Router();
const { getSummaryCards } = require('../controllers/summarycardsController');

// GET request for summary cards
router.get('/summarycards', getSummaryCards);

module.exports = router;
