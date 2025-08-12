const express = require('express');
const router = express.Router();
const {getTotalContributions} = require('../controllers/totalcontributionscontroller');

router.get('/', getTotalContributions);

module.exports = router;