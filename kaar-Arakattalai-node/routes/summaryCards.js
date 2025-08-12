// routes/summaryCards.js
const express = require('express');
const router = express.Router();
const summaryCardsController = require('../controllers/summaryCards');

// GET request for summary cards
router.get('/', summaryCardsController.getSummaryCards);

module.exports = router;
