const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const { getPagination } = require('../utils/pagination');

const prisma = new PrismaClient();

// Helper function to get 4 random elements from an array
const getRandomElements = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// [DASHBOARD] - Latest live campaigns component
// Endpoint to get latest live campaigns with pagination and additional data
// Example: /v1/campaigns/live?page=0&pageSize=10
router.get('/', async (req, res) => {
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);

  try {
    const campaigns = await prisma.campaigns.findMany({
      where: { published: true, end_date: { gt: new Date() } },
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

      return {
        ...campaign,
        userCount: campaign.users.length,
        userAvatars: randomAvatars,
      };
    });

    res.json(campaignsWithUserDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Live campaigns not found' });
  }
});

module.exports = router;
