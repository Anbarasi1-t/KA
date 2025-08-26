// routes/treasurybarRoute.js

const express = require('express');
const router = express.Router();

// ✅ Import controller (match exact filename and case in /controllers)
const treasurybarController = require('../controllers/treasurybarController');

// --- Define routes ---
// GET /api/treasurybar/pending → return pending count
router.get('/pending', treasurybarController.getPendingCount);

// GET /api/treasurybar/completed → return completed count
router.get('/completed', treasurybarController.getCompletedCount);

// ✅ Export router so app.js can use it
module.exports = router;
