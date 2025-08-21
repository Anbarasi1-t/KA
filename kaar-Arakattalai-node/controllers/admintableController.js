// controllers/adminTableController.js
// Returns list of employee requests for admin table (sample data)

exports.getAllEmployeeRequests = (req, res) => {
  try {
    const employees = [
      {
        id: '1',
        employeeName: 'Aiswarya G',
        employeeAID: '901722',
        referralType: 'Education',
        annualContribution: 100000,
        amountRequested: 50000
      },
      {
        id: '2',
        employeeName: 'Anbarasi T',
        employeeAID: '901723',
        referralType: 'Medical',
        annualContribution: 100000,
        amountRequested: 50000
      },
      {
        id: '3',
        employeeName: 'Naren Sairam S',
        employeeAID: '901726',
        referralType: 'CSR & claims',
        annualContribution: 100000,
        amountRequested: 50000
      },
      {
        id: '4',
        employeeName: 'Simon Xavier',
        employeeAID: '987651',
        referralType: 'Laptop',
        annualContribution: 100000,
        amountRequested: 50000
      },
      {
        id: '5',
        employeeName: 'Deva Raj',
        employeeAID: '582100',
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
