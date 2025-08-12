// controllers/summaryCards.js
// Controller to fetch summary card data

// Example data - replace with DB queries later if needed
exports.getSummaryCards = (req, res) => {
  try {
    const summaryData = [
      { label: 'Requests', count: 120 },
      { label: 'Approvals', count: 95 },
      { label: 'Rejected', count: 15 },
      { label: 'Scholarship Form', count: 40 },
      { label: 'Assistance to NGO', count: 25 },
      { label: 'Medical Assistance', count: 18 },
      { label: 'Laptop Request', count: 12 },
      { label: 'CSR – Advances & Expenses', count: 8 }
    ];

    res.status(200).json(summaryData);
  } catch (error) {
    console.error("Error fetching summary cards:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
