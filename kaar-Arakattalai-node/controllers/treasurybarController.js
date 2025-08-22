// controllers/treasurybarController.js

// --- Controller functions for Treasury Bar ---
// Right now they return hardcoded values, but later you can fetch from DB

// GET pending count
exports.getPendingCount = (req, res) => {
  res.status(200).json(32);   // ✅ returns number directly
};

// GET completed count
exports.getCompletedCount = (req, res) => {
  res.status(200).json(5);    // ✅ returns number directly
};
