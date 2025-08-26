// controllers/contributorController.js
const db = require('../db'); // mysql2/promise pool

exports.createOrUpdateContribution = async (req, res) => {
  try {
    const data = req.body;

    // Require FY and some form of AID or contributor_id
    if (!data.fy || (!data.contributor_id && !data.associate_id && !data.employee_aid && !data.aid)) {
      return res.status(400).json({ error: 'Missing required fields. Provide fy and one of contributor_id | associate_id | employee_aid | aid.' });
    }

    let contributor_id = data.contributor_id || null;
    const providedAid = data.associate_id || data.employee_aid || data.aid || null;

    // Resolve contributor_id if not provided
    if (!contributor_id) {
      // Try employee_aid lookup, fallback to associate_id on unknown column error
      try {
        const [existingByEmp] = await db.execute(
          'SELECT contributor_id FROM t_ka_contributor_detail WHERE employee_aid = ? AND is_active = 1',
          [providedAid]
        );
        if (existingByEmp.length > 0) {
          contributor_id = existingByEmp[0].contributor_id;
        } else {
          // Insert using employee_aid column
          const [insEmp] = await db.execute(
            'INSERT INTO t_ka_contributor_detail (employee_aid, created_by, created_on, is_active) VALUES (?, ?, NOW(), 1)',
            [providedAid, data.created_by || null]
          );
          contributor_id = insEmp.insertId;
        }
      } catch (err) {
        // If column doesn't exist, try associate_id flow
        if (err && err.sqlState === '42S22') {
          // SELECT with associate_id
          const [existingByAssoc] = await db.execute(
            'SELECT contributor_id FROM t_ka_contributor_detail WHERE associate_id = ? AND is_active = 1',
            [providedAid]
          );
          if (existingByAssoc.length > 0) {
            contributor_id = existingByAssoc[0].contributor_id;
          } else {
            // INSERT with associate_id
            const [insAssoc] = await db.execute(
              'INSERT INTO t_ka_contributor_detail (associate_id, created_by, created_on, is_active) VALUES (?, ?, NOW(), 1)',
              [providedAid, data.created_by || null]
            );
            contributor_id = insAssoc.insertId;
          }
        } else {
          throw err;
        }
      }
    }

    if (!contributor_id) {
      return res.status(400).json({ error: 'Unable to resolve contributor_id.' });
    }

    // Insert into detail table per provided schema
    const annual_contribution = data.annual_contribution ?? null;
    const monthly_contribution = data.monthly_contribution ?? null;
    const eligible_amount = data.eligible_amount ?? 0;
    const balance_amount = data.balance_amount ?? 0;
    const referral_count = data.referral_count ?? 0;

    await db.execute(
      `INSERT INTO t_ka_contribution_item_detail
       (contributor_id, annual_contribution, monthly_contribution, fy,
        eligible_amount, balance_amount, referral_count, created_by, created_on, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 1)`,
      [
        contributor_id,
        annual_contribution,
        monthly_contribution,
        data.fy,
        eligible_amount,
        balance_amount,
        referral_count,
        data.created_by || null
      ]
    );

    return res.status(200).json({ message: 'Contribution saved successfully', contributor_id });
  } catch (err) {
    console.error('Error saving contribution:', err);
    return res.status(500).json({ error: err.sqlMessage || err.message || 'Server error while saving contribution' });
  }
};
