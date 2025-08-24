const db = require("../db.js");

// Add a contribution entry
const addContribution = async (req, res) => {
  try {
    const {
      contributor_id,
      fy,
      month,
      amount,
      transfer_type,
      annual_contribution,
      monthly_contribution,
      eligible_amount,
      balance_amount,
      referral_count,
      created_by
    } = req.body;

    const query = `
      INSERT INTO t_ka_contribution_item_history 
      (contributor_id, fy, month, amount, transfer_type, annual_contribution, monthly_contribution, 
       eligible_amount, balance_amount, referral_count, created_by, created_on, is_active) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 1)
    `;

    const values = [
      contributor_id,
      fy,
      month,
      amount,
      transfer_type,
      annual_contribution,
      monthly_contribution,
      eligible_amount,
      balance_amount,
      referral_count,
      created_by
    ];

    const [result] = await db.query(query, values);

    res.status(201).json({
      message: "Contribution added successfully",
      history_id: result.insertId
    });
  } catch (err) {
    console.error("Error adding contribution:", err);
    res.status(500).json({ error: "Failed to add contribution" });
  }
};

// Fetch all contributions
const getContributions = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM t_ka_contribution_item_history WHERE is_active = 1 ORDER BY created_on DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching contributions:", err);
    res.status(500).json({ error: "Failed to fetch contributions" });
  }
};

module.exports = {
  addContribution,
  getContributions
};
