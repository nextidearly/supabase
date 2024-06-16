const express = require('express');
const liveCampaignsRouter = require('./liveCampaigns');
const userCreatedCampaignsRouter = require('./userCreatedCampaigns');

const v1Router = express.Router();

// Example: /v1/campaigns/live?page=0&pageSize=10
v1Router.use('/campaigns/live', liveCampaignsRouter);

// Example: /v1/user/:id/campaigns?page=0&pageSize=10
v1Router.use('/user/:id/campaigns', userCreatedCampaignsRouter);

module.exports = v1Router;
