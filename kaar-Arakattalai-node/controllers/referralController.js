exports.getAllReferrals = (req, res) => {
  const referrals = [
    {
      id: 'REF001',
      beneficiaryName: 'Arun Kumar',
      referralType: 'Education',
      status: 'Approved'
    },
    {
      id: 'REF002',
      beneficiaryName: 'Meena R',
      referralType: 'Medical',
      status: 'Pending'
    },
    {
      id: 'REF003',
      beneficiaryName: 'David',
      referralType: 'Emergency',
      status: 'Rejected'
    },
    {
      id: 'REF001',
      beneficiaryName: 'Arun Kumar',
      referralType: 'Education',
      status: 'Approved'
    },
    {
      id: 'REF002',
      beneficiaryName: 'Meena R',
      referralType: 'Medical',
      status: 'Pending'
    },
    {
      id: 'REF003',
      beneficiaryName: 'David',
      referralType: 'Emergency',
      status: 'Rejected'
    },
    {
      id: 'REF001',
      beneficiaryName: 'Arun Kumar',
      referralType: 'Education',
      status: 'Approved'
    },
    {
      id: 'REF002',
      beneficiaryName: 'Meena R',
      referralType: 'Medical',
      status: 'Pending'
    },
    {
      id: 'REF003',
      beneficiaryName: 'David',
      referralType: 'Emergency',
      status: 'Rejected'
    },
    {
      id: 'REF001',
      beneficiaryName: 'Arun Kumar',
      referralType: 'Education',
      status: 'Approved'
    },
    {
      id: 'REF002',
      beneficiaryName: 'Meena R',
      referralType: 'Medical',
      status: 'Pending'
    },
    {
      id: 'REF003',
      beneficiaryName: 'David',
      referralType: 'Emergency',
      status: 'Rejected'
    },
    {
      id: 'REF001',
      beneficiaryName: 'Arun Kumar',
      referralType: 'Education',
      status: 'Approved'
    },
    {
      id: 'REF002',
      beneficiaryName: 'Meena R',
      referralType: 'Medical',
      status: 'Pending'
    },
    {
      id: 'REF003',
      beneficiaryName: 'David',
      referralType: 'Emergency',
      status: 'Rejected'
    },
  ];

  res.status(200).json(referrals);
};
