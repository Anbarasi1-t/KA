const express = require('express');
const router = express.Router();
const { getContributions } = require('../controllers/contributionController');

router.get('/', getContributions);

module.exports = router;


