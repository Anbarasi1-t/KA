require('dotenv').config();
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
const updatecontributionRoutes = require('./routes/updatecontributionRoutes');
const contributorRoutes=require('./routes/contributorRoutes')
// const educationRoutes = require("./routes/educationRoutes");

// Mount the routes
app.use('/api/referrals', referralRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/totalcontributions', totalContributionsRoutes);
app.use('/api/summarycons', summaryConsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/employees', adminTableRoutes);
app.use('/api/summaryCards', summaryCardsRoutes);
// app.use("/api", educationRoutes);
app.use('/api/updatecontribution', updatecontributionRoutes);
app.use('/api/contributors', contributorRoutes);
 // Ensure this file exists

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

