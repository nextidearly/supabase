require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const v1Router = require('./routes/v1Router');

app.use('/v1', v1Router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  // Always returns the date and time in ISO 8601 format (UTC)
  console.log('Current server time (UTC):', new Date().toISOString());
});
