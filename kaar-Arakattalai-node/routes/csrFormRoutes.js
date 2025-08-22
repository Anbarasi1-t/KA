const express = require("express");
const router = express.Router();
const csrFormController = require("../controllers/csrformController");

// For file uploads (bills/invoices)
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("billsAndInvoices"), csrFormController.createCsrForm);
router.get("/", csrFormController.getCsrForms);
router.get("/:id", csrFormController.getCsrFormById);

module.exports = router;
