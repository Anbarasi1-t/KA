// controllers/adminTableController.js
// Returns list of employee requests for admin table (sample data)

exports.getAllEmployeeRequests = (req, res) => {
  try {
    const employees = [
      {
        id: '1',
        employeeName: 'Arun Chakravarthi V',
        employeeAID: '123',
        referralType: 'Education',
        annualContribution: 100000,
        amountRequested: 50000
      },
      {
        id: '2',
        employeeName: 'Devika G',
        employeeAID: '220242',
        referralType: 'Medical',
        annualContribution: 100000,
        amountRequested: 50000
      },
      {
        id: '3',
        employeeName: 'Saalai Chaitanyan K',
        employeeAID: '12344',
        referralType: 'CSR & claims',
        annualContribution: 100000,
        amountRequested: 50000
      },
      {
        id: '4',
        employeeName: 'Mark Atwood',
        employeeAID: '98765',
        referralType: 'Laptop',
        annualContribution: 100000,
        amountRequested: 50000
      },
      {
        id: '5',
        employeeName: 'Corin Freemark',
        employeeAID: '8765',
        referralType: 'Education',
        annualContribution: 100000,
        amountRequested: 50000
      },
      // ... you can repeat or add more sample rows to simulate dataset
    ];

    return res.status(200).json(employees);
  } catch (error) {
    console.error('Error in getAllEmployeeRequests:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
