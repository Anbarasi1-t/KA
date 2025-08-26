const db = require("../db.js");

// ---------------- SAVE CONTRIBUTION (ADD OR UPDATE) ----------------
const saveContribution = async (req, res) => {
  try {
    const {
      history_id,
      item_id,
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
      updated_by,
      created_by
    } = req.body;

    if (!contributor_id || !amount) {
      return res.status(400).json({ error: "contributor_id and amount are required" });
    }

    // Validate contributor exists
    const [contributor] = await db.query(
      "SELECT 1 FROM t_ka_contributor_detail WHERE contributor_id = ?",
      [contributor_id]
    );
    if (contributor.length === 0) {
      return res.status(400).json({ error: `Contributor ID ${contributor_id} not found` });
    }

    // If history_id exists → update
    if (history_id && history_id > 0) {
      const fields = [
        "item_id", "contributor_id", "fy", "month", "amount", "transfer_type",
        "annual_contribution", "monthly_contribution", "eligible_amount",
        "balance_amount", "referral_count", "is_active", "updated_by"
      ];

      const updates = [];
      const values = [];

      fields.forEach(field => {
        if (req.body[field] !== undefined) {
          updates.push(`${field} = ?`);
          values.push(req.body[field]);
        }
      });

      if (updates.length === 0) {
        return res.status(400).json({ error: "No valid fields provided for update" });
      }

      // Add updated timestamp
      updates.push("updated_on = NOW()");
      values.push(history_id);

      const query = `UPDATE t_ka_contribution_item_history SET ${updates.join(", ")} WHERE history_id = ?`;
      const [result] = await db.query(query, values);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: `Contribution with history_id ${history_id} not found` });
      }

      return res.json({ message: "Contribution updated successfully", history_id });
    }

    // Else → add new contribution
    if (!item_id || !fy || !month || !transfer_type || !created_by) {
      return res.status(400).json({ error: "Missing required fields for new contribution" });
    }

    const query = `
      INSERT INTO t_ka_contribution_item_history
      (item_id, contributor_id, fy, month, amount, transfer_type, annual_contribution, monthly_contribution,
       eligible_amount, balance_amount, referral_count, created_by, created_on, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 1)
    `;
    const values = [
      item_id, contributor_id, fy, month, amount, transfer_type,
      annual_contribution || 0, monthly_contribution || 0,
      eligible_amount || 0, balance_amount || 0, referral_count || 0,
      created_by
    ];

    const [result] = await db.query(query, values);

    res.status(201).json({ message: "Contribution added", history_id: result.insertId });

  } catch (err) {
    console.error("Error in saveContribution:", err);
    res.status(500).json({ error: "Failed to save contribution", details: err.message });
  }
};

// ---------------- GET CONTRIBUTIONS ----------------
const getContributions = async (req, res) => {
  try {
    let { page = 1, limit = 10, contributor_id, fy, month, transfer_type, is_active } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const conditions = [];
    const values = [];

    if (contributor_id) { conditions.push("contributor_id = ?"); values.push(contributor_id); }
    if (fy) { conditions.push("fy = ?"); values.push(fy); }
    if (month) { conditions.push("month = ?"); values.push(month); }
    if (transfer_type) { conditions.push("transfer_type = ?"); values.push(transfer_type); }
    if (is_active !== undefined) { conditions.push("is_active = ?"); values.push(is_active); }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Total count for pagination
    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM t_ka_contribution_item_history ${whereClause}`,
      values
    );
    const total = countResult[0].total;

    // Paginated results
    const [rows] = await db.query(
      `SELECT * FROM t_ka_contribution_item_history ${whereClause} ORDER BY created_on DESC LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: rows
    });
  } catch (err) {
    console.error("Error in getContributions:", err);
    res.status(500).json({ error: "Failed to fetch contributions", details: err.message });
  }
};

module.exports = {
  saveContribution,
  getContributions
};
