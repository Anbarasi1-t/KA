const express = require('express');
const router = express.Router();
const { getAllReferrals } = require('../controllers/referralController');

router.get('/', getAllReferrals);

module.exports = router;
