// controllers/summarycardsController.js

// ✅ Individual count controllers returning number directly
exports.getRequestsCount = (req, res) => {
  res.status(200).json(120);
};

exports.getApprovalsCount = (req, res) => {
  res.status(200).json(95);
};

exports.getRejectedCount = (req, res) => {
  res.status(200).json(15);
};

exports.getScholarshipFormCount = (req, res) => {
  res.status(200).json(40);
};

exports.getAssistanceNgoCount = (req, res) => {
  res.status(200).json(25);
};

exports.getMedicalAssistanceCount = (req, res) => {
  res.status(200).json(18);
};

exports.getLaptopRequestCount = (req, res) => {
  res.status(200).json(12);
};

exports.getCsrAdvancesCount = (req, res) => {
  res.status(200).json(8);
};
