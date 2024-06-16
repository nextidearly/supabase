const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { getLiveStatus } = require('../utils/getLiveStatus');

const prisma = new PrismaClient();
const router = express.Router();

// TODO: Fix the query to fetch the campaigns a user is participating in

/**
 * [DASHBOARD] - Route serving all campaigns a user participates in
 * Example: /v1/user/:id/campaigns/participating
 *
 * @name getUserParticipatedCampaigns
 * @route {GET} /v1/user/:id/campaigns/participating
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.userId - The ID of the user
 * @param {Object} res - Express response object
 * @returns {Array<Object>} 200 - A list of campaigns with user details and computed scores
 * @returns {Object} 500 - Error retrieving campaigns
 */
router.get('/', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all campaigns in which the user participates
    const userCampaigns = await prisma.campaignUsers.findMany({
      where: { user_id: userId },
      include: {
        campaign: {
          include: {
            users: {
              include: {
                user: {
                  select: {
                    id: true,
                  },
                },
              },
            },
            user_scores: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setUTCDate(today.getUTCDate() - 1);

    const campaignsWithDetails = await Promise.all(
      userCampaigns.map(async (userCampaign) => {
        const campaign = userCampaign.campaign;

        // Calculate the total number of users in the campaign
        const totalUsers = campaign.user_scores.length;

        // Sort user scores to determine the ranking
        const sortedScores = campaign.user_scores.sort(
          (a, b) => b.score - a.score,
        );
        const userScoreEntry = sortedScores.find(
          (score) => score.user_id === userId,
        );
        const userRanking =
          sortedScores.findIndex((score) => score.user_id === userId) + 1;
        const userPoints = userScoreEntry ? userScoreEntry.score : 0;

        // Fetch user scores for today and yesterday
        const todayStart = new Date(
          Date.UTC(
            today.getUTCFullYear(),
            today.getUTCMonth(),
            today.getUTCDate(),
            0,
            0,
            0,
            0,
          ),
        );
        const todayEnd = new Date(
          Date.UTC(
            today.getUTCFullYear(),
            today.getUTCMonth(),
            today.getUTCDate(),
            23,
            59,
            59,
            999,
          ),
        );

        const yesterdayStart = new Date(
          Date.UTC(
            yesterday.getUTCFullYear(),
            yesterday.getUTCMonth(),
            yesterday.getUTCDate(),
            0,
            0,
            0,
            0,
          ),
        );
        const yesterdayEnd = new Date(
          Date.UTC(
            yesterday.getUTCFullYear(),
            yesterday.getUTCMonth(),
            yesterday.getUTCDate(),
            23,
            59,
            59,
            999,
          ),
        );

        const todayScores = await prisma.userScores.findMany({
          where: {
            user_id: userId,
            campaign_id: campaign.id,
            created_at: {
              gte: todayStart,
              lt: todayEnd,
            },
          },
        });

        const yesterdayScores = await prisma.userScores.findMany({
          where: {
            user_id: userId,
            campaign_id: campaign.id,
            created_at: {
              gte: yesterdayStart,
              lt: yesterdayEnd,
            },
          },
        });

        const todayPoints = todayScores.reduce(
          (total, score) => total + score.score,
          0,
        );
        const yesterdayPoints = yesterdayScores.reduce(
          (total, score) => total + score.score,
          0,
        );

        // Calculate the percentage increase in points and point difference
        const pointsDifference = todayPoints - yesterdayPoints;
        const pointsPercentageIncrease =
          yesterdayPoints > 0
            ? ((todayPoints - yesterdayPoints) / yesterdayPoints) * 100
            : todayPoints > 0
              ? 100
              : 0;

        // Get live status and calculate days since start and days until end
        const { isLive, daysUntilEnd, daysSinceStart } =
          getLiveStatus(campaign);

        return {
          id: campaign.id,
          name: campaign.name,
          avatarUrl: campaign.logo_url,
          ranking: userRanking,
          totalUsers: totalUsers,
          points: userPoints,
          pointsDifference: pointsDifference,
          pointsPercentageIncrease: pointsPercentageIncrease,
          isLive,
          daysSinceStart,
          daysUntilEnd,
        };
      }),
    );

    res.json(campaignsWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving user campaigns' });
  }
});

module.exports = router;
