exports.getAllCount = (req, res) => {
  const allCount = 5186;
  res.status(200).json(allCount);
};

exports.getApprovedCount = (req, res) => {
  const approvedCount = 5186;
  res.status(200).json(approvedCount);
};

exports.getInProgressCount = (req, res) => {
  const inProgressCount = 24;
  res.status(200).json(inProgressCount);
};

exports.getRejectedCount = (req, res) => {
  const rejectedCount = 5186;
  res.status(200).json(rejectedCount);
};