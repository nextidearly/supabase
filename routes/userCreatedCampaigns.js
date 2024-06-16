const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const { getPagination } = require('../utils/pagination');

const prisma = new PrismaClient();

// [DASHBOARD] - Campaigns you created component
// Endpoint to get campaigns created by a user with pagination, user names, avatars, and computed scores per user
// Example: /v1/user/:id/campaigns?page=0&pageSize=10
router.get('/user/:id/campaigns', async (req, res) => {
  const userId = req.params.id;
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);

  try {
    const campaigns = await prisma.campaigns.findMany({
      where: { admin_id: userId },
      skip: offset,
      take: limit,
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                user_name: true,
                avatar_url: true,
              },
            },
          },
        },
        user_scores: true,
      },
    });

    const campaignsWithUserDetails = campaigns.map((campaign) => {
      const usersWithScores = campaign.users.map((campaignUser) => {
        const userScore = campaign.user_scores
          .filter((score) => score.user_id === campaignUser.user.id)
          .reduce((acc, score) => acc + score.score, 0);

        return {
          userName: campaignUser.user.user_name,
          avatarUrl: campaignUser.user.avatar_url,
          totalUserScore: userScore,
          blacklisted: campaignUser.blacklisted, // Include blacklisted status
        };
      });

      return {
        id: campaign.id,
        name: campaign.name,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        users: usersWithScores,
      };
    });

    res.json(campaignsWithUserDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Campaigns not found' });
  }
});

module.exports = router;
