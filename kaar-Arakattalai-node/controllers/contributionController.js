// Simple JSON source for contributions; replace with DB later if needed
exports.getContributions = (req, res) => {
  const data = [
    { fy: '2023', month: 'January', amount: 1000, transferType: 'Bank Transfer' },
    { fy: '2023', month: 'February', amount: 1000, transferType: 'Bank Transfer' },
    { fy: '2023', month: 'March', amount: 1000, transferType: 'Bank Transfer' },
    { fy: '2023', month: 'April', amount: 1000, transferType: 'Bank Transfer' },
    { fy: '2023', month: 'May', amount: 1000, transferType: 'Bank Transfer' },
    { fy: '2023', month: 'June', amount: 1000, transferType: 'Bank Transfer' },
    { fy: '2023', month: 'July', amount: 1000, transferType: 'Bank Transfer' },
    { fy: '2023', month: 'August', amount: 1000, transferType: 'Bank Transfer' },
    { fy: '2023', month: 'September', amount: 1000, transferType: 'Bank Transfer' }
  ];
  res.json(data);
};


