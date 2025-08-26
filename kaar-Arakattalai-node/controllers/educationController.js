// controllers/educationController.js

// Temporary in-memory "database"
let educationForms = [];

// POST - save new form submission
exports.submitForm = (req, res) => {
  try {
    const formData = req.body; // Angular will send JSON
    educationForms.push({
      ...formData,
      submittedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: formData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving form",
      error: error.message
    });
  }
};

// GET - fetch all stored forms
exports.getForms = (req, res) => {
  res.status(200).json({
    success: true,
    forms: educationForms
  });
};
