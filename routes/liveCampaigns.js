const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const { getPagination } = require('../utils/pagination');
const { getLiveStatus } = require('../utils/getLiveStatus');

const prisma = new PrismaClient();

/**
 * Helper function to get 4 random elements from an array
 * @param {Array} array - The array to sample from
 * @param {number} count - The number of elements to sample
 * @returns {Array} - An array containing the sampled elements
 */
const getRandomElements = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * [DASHBOARD] - Route serving the latest live campaigns
 * Example: /v1/campaigns/live?page=0&pageSize=10
 *
 * @name latestLiveCampaigns
 * @route {GET} /v1/campaigns/live
 * @param {Object} req - Express request object
 * @param {Object} req.query - Request query parameters
 * @param {number} req.query.page - Page number for pagination (optional)
 * @param {number} req.query.pageSize - Number of items per page for pagination (optional)
 * @param {Object} res - Express response object
 * @returns {Array} 200 - An array of live campaigns with user details and random avatars
 * @returns {Object} 500 - Error retrieving live campaigns
 */
router.get('/', async (req, res) => {
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);

  try {
    const now = new Date().toISOString();

    const campaigns = await prisma.campaigns.findMany({
      where: {
        published: true,
        start_date: { lte: now },
        end_date: { gte: now },
      },
      orderBy: {
        start_date: 'desc',
      },
      skip: offset,
      take: limit,
      include: {
        users: {
          select: {
            user: {
              select: {
                avatar_url: true,
              },
            },
          },
        },
      },
    });

    const campaignsWithUserDetails = campaigns.map((campaign) => {
      const userAvatars = campaign.users.map((user) => user.user.avatar_url);
      const randomAvatars = getRandomElements(userAvatars, 4);

      const { timeUntilEnd, timeSinceStart } = getLiveStatus(campaign);

      return {
        ...campaign,
        userCount: campaign.users.length,
        userAvatars: randomAvatars,
        timeUntilEnd,
        timeSinceStart,
      };
    });

    res.json(campaignsWithUserDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Live campaigns not found' });
  }
});

module.exports = router;
