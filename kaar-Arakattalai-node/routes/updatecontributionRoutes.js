const express = require("express");
const { saveContribution, getContributions } = require("../controllers/updatecontributionController");

const router = express.Router();

// Save contribution (add or update)
router.post("/contribution-history", saveContribution); // first-time or update with history_id
router.put("/contribution-history", saveContribution);  // update only if history_id is provided

// Get all contributions
router.get("/contribution-history", getContributions);

module.exports = router;
