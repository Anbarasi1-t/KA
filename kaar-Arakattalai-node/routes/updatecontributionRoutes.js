const express = require("express");
const { addContribution, getContributions } = require("../controllers/updatecontributionController");

const router = express.Router();

// Add a new contribution
router.post("/contribution-history", addContribution);

// Get all contributions
router.get("/contribution-history", getContributions);

module.exports = router;
