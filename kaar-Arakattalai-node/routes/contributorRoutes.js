const express = require('express');
const router = express.Router();
const contributorController = require('../controllers/contributorController');

router.post('/contribution', contributorController.createOrUpdateContribution);

module.exports = router;
