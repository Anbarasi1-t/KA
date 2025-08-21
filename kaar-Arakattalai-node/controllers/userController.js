exports.getProfile = (req, res) => {
  const userData = {
    profilePicture: "/assets/profile_picture.png",
    name: "Anbarasi",
    aid: 50,
    designation: "Professional",
    manager: "Srinivasan Subbiah",
    annualContribution: 1000,
    annualEligibleReferral: 0,
    balanceEligibleReferral: 0,
    myReferrals: 0
    
  };
  res.json(userData);
};
