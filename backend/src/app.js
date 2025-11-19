require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const certificateRoutes = require('./routes/certificateRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ status: 'ok', service: 'Academic Certificate Verification - Backend' }));

app.use('/certificates', certificateRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend API listening on port ${PORT}`);
  });
}

module.exports = app;
