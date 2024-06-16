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
// Example: /api/campaigns/live?page=0&pageSize=10
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
