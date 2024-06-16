const express = require('express');
const liveCampaignsRouter = require('./liveCampaigns');
const userCreatedCampaignsRouter = require('./userCreatedCampaigns');
const userParticipatingCampaignsRouter = require('./userParticipatingCampaigns');

const v1Router = express.Router();

// Example: /v1/campaigns/live?page=0&pageSize=10
v1Router.use('/campaigns/live', liveCampaignsRouter);

// Example: /v1/user/:id/campaigns?page=0&pageSize=10
v1Router.use('/user/:id/campaigns', userCreatedCampaignsRouter);

// Example: /v1/user/:id/campaigns/participating
v1Router.use(
  '/user/:id/campaigns/participating',
  userParticipatingCampaignsRouter,
);

module.exports = v1Router;
