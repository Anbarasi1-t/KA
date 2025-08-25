// csrFormController.js
const db = require("../db"); // assuming db.js exports your MySQL connection

// Create CSR form submission
exports.createCsrForm = (req, res) => {
  try {
    const {
      eventName,
      claimAmount,
      accountNameForDD,
      justification,
      declaration
    } = req.body;

    const billsAndInvoices = req.file ? req.file.filename : null; // if using multer for file upload
    const created_by = "system"; // you can pass from frontend or session user
    const created_on = new Date();

    const sql = `
      INSERT INTO t_csr_form_detail 
      (event_name, claim_amount, account_name_for_dd, justification, bills_and_invoices, declaration, created_by, created_on, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        eventName,
        claimAmount,
        accountNameForDD,
        justification,
        billsAndInvoices,
        declaration ? 1 : 0,
        created_by,
        created_on,
        1
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting CSR form:", err);
          return res.status(500).json({ success: false, message: "Database error" });
        }
        res.status(201).json({
          success: true,
          message: "CSR form submitted successfully",
          formId: result.insertId
        });
      }
    );
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch all CSR forms
exports.getCsrForms = (req, res) => {
  const sql = "SELECT * FROM t_csr_form_detail WHERE is_active = 1 ORDER BY created_on DESC";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching forms:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json({ success: true, data: rows });
  });
};

// Fetch single CSR form by ID
exports.getCsrFormById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM t_csr_form_detail WHERE csr_id = ? AND is_active = 1";
  db.query(sql, [id], (err, row) => {
    if (err) {
      console.error("Error fetching form:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    if (!row.length) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }
    res.json({ success: true, data: row[0] });
  });
};
