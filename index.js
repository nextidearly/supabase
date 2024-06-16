const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const router = express.Router();

app.use('/v1', router);

// Helper function to get pagination parameters
const getPagination = (page, pageSize) => {
  const limit = pageSize ? +pageSize : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

// Helper function to get 4 random elements from an array
const getRandomElements = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// [DASHBOARD] - Latest live campaigns component
// Endpoint to get latest live campaigns with pagination and additional data
// Example: /api/v1/campaigns/live?page=0&pageSize=10
router.get('/campaigns/live', async (req, res) => {
  const { page, pageSize } = req.query;
  const { limit, offset } = getPagination(page, pageSize);

  try {
    const campaigns = await prisma.campaigns.findMany({
      where: { published: true, end_date: { gt: new Date() } },
      orderBy: {
        start_date: 'desc',
      },
      skip: offset, // Skip the first 'offset' campaigns
      take: limit, // Take the next 'limit' campaigns
      include: {
        users: {
          select: {
            user: {
              select: {
                avatar_url: true, // Select only avatar_url of users
              },
            },
          },
        },
      },
    });

    // Map campaigns to include the number of users and their avatars
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

// [DASHBOARD] - Campaigns you created component
// Endpoint to get campaigns created by a user with pagination, user names, avatars, and computed scores per user
// Example: /api/v1//user/:id/campaigns?page=0&pageSize=10
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
