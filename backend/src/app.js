require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const certificateRoutes = require('./routes/certificateRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend communication
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ status: 'ok', service: 'Academic Certificate Verification - Backend' }));

app.use('/certificates', certificateRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error('\n❌ Unhandled error in Express:');
  console.error('   Error:', err.message);
  console.error('   Code:', err.code);
  console.error('   Status:', err.status || 500);
  if (err.stack) {
    console.error('   Stack:', err.stack.split('\n').slice(0, 5).join('\n'));
  }
  console.error('');
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend API listening on port ${PORT}`);
  });
}

module.exports = app;
