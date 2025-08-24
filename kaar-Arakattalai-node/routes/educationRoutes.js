// routes/educationRoutes.js
const express = require("express");
const router = express.Router();
const educationController = require("../controllers/educationController");

// POST endpoint to submit form
router.post("/education-form", educationController.submitForm);

// GET endpoint to view all submissions
router.get("/education-form", educationController.getForms);

module.exports = router;
