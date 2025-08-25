
require('dotenv').config();
const express = require('express');

const cors = require('cors');
const app = express();

app.use(cors()); // ✅ Allow requests from Angular frontend
app.use(express.json()); // ✅ Parse JSON bodies

// --- Import route files (must match exact filenames in /routes folder) ---
const referralRoutes = require('./routes/referralRoutes');
const contributionRoutes = require('./routes/contributionRoutes');
const totalContributionsRoutes = require('./routes/totalcontributionsroutes'); 
const summaryConsRoutes = require('./routes/summaryconsroutes'); 
const userRoutes = require('./routes/userRoutes');

const adminTableRoutes = require('./routes/admintableRoutes'); 
const summaryCardsRoutes = require('./routes/summarycardsRoutes'); 
const treasurybarRoutes = require('./routes/treasurybarRoute'); // ✅ matches your file
// const updatecontributionRoutes = require('./routes/updatecontributionRoutes');
// const educationRoutes = require("./routes/educationRoutes");


// --- Mount the routes with API prefixes ---
app.use('/api/referrals', referralRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/totalcontributions', totalContributionsRoutes);
app.use('/api/summarycons', summaryConsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/employees', adminTableRoutes);
app.use('/api/summaryCards', summaryCardsRoutes);
// <<<<<<< feature/treasury
app.use('/api/treasurybar', treasurybarRoutes); // ✅ mount treasurybar
// =======
// // app.use("/api", educationRoutes);
// app.use('/api/updatecontribution', updatecontributionRoutes);
//  // Ensure this file exists
// >>>>>>> main

// --- Default route just to check server status ---
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
