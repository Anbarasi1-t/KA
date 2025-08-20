const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // ✅ Allow all origins
app.use(express.json());

// Import route files (match exact names from your /routes folder)
const referralRoutes = require('./routes/referralRoutes');
const contributionRoutes = require('./routes/contributionRoutes');
const totalContributionsRoutes = require('./routes/totalcontributionsroutes'); // lowercase file name
const summaryConsRoutes = require('./routes/summaryconsroutes'); // lowercase file name
const userRoutes = require('./routes/userRoutes');
const adminTableRoutes = require('./routes/admintableRoutes'); // exact file name in your folder
const summaryCardsRoutes = require('./routes/summarycardsRoutes'); // exact file name in your folder

// Mount the routes
app.use('/api/referrals', referralRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/totalcontributions', totalContributionsRoutes);
app.use('/api/summarycons', summaryConsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/employees', adminTableRoutes);
app.use('/api/summaryCards', summaryCardsRoutes);
 // Ensure this file exists

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

