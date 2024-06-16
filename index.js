const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const liveCampaignsRouter = require('./routes/liveCampaigns');
const userCreatedCampaignsRouter = require('./routes/userCreatedCampaigns');

// Example: /v1/campaigns/live?page=0&pageSize=10
app.use('/v1', liveCampaignsRouter);

// Example: /v1/user/:id/campaigns?page=0&pageSize=10
app.use('/v1', userCreatedCampaignsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
