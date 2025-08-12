const express = require('express');
const cors = require('cors');
const referralRoutes = require('./routes/referralRoutes');
const totalcontributionsroutes = require('./routes/totalcontributionsroutes');
const summaryconsroutes = require('./routes/summaryconsroutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/referrals', referralRoutes);
app.use('/api/totalcontributions', totalcontributionsroutes);
app.use('/api/summarycons', summaryconsroutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
