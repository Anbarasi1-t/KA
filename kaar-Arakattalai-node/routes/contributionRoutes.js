const express = require('express');
const router = express.Router();
const contributionController = require('../controllers/contributionController');

// Return contributions (currently static; replace with DB-backed implementation as needed)
router.get('/', contributionController.getContributions);

module.exports = router;
