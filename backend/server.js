const express = require('express');
const cors = require('cors');
require('dotenv').config();

const opportunityRoutes = require('./routes/opportunityRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Research Opportunity Portal API is running');
});

app.use('/api/opportunities', opportunityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});