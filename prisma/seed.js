const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  await prisma.tweets.deleteMany();
  await prisma.usersClaims.deleteMany();
  await prisma.campaignRetweets.deleteMany();
  await prisma.userScores.deleteMany();
  await prisma.campaignUsers.deleteMany();
  await prisma.campaignFollowAccounts.deleteMany();
  await prisma.campaigns.deleteMany();
  await prisma.projects.deleteMany();
  await prisma.wallets.deleteMany();
  await prisma.invites.deleteMany();
  await prisma.users.deleteMany();

  const users = [];
  const projects = [];
  const campaigns = [];
  const tweets = [];
  const wallets = [];
  const userScores = [];
  const invites = [];
  const campaignUsers = [];
  const campaignRetweets = [];
  const campaignFollowAccounts = [];
  const usersClaims = [];

  // Create Users
  for (let i = 0; i < 10; i++) {
    const user = await prisma.users.create({
      data: {
        email: faker.internet.email(),
        user_name: faker.internet.userName(),
        avatar_url: faker.image.avatar(),
        twitter_id: faker.string.uuid(),
        verified: faker.datatype.boolean(),
        side_score: faker.number.int({ min: 0, max: 100 }),
      },
    });
    users.push(user);
  }

  // Create Projects
  for (let i = 0; i < 5; i++) {
    const project = await prisma.projects.create({
      data: {
        name: faker.company.name(),
        slug: faker.lorem.slug(),
        owner_id: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
      },
    });
    projects.push(project);
  }

  // Create Campaigns
  for (let i = 0; i < 5; i++) {
    const campaign = await prisma.campaigns.create({
      data: {
        admin_id: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        project_id:
          projects[faker.number.int({ min: 0, max: projects.length - 1 })].id,
        start_date: faker.date.future(),
        end_date: faker.date.future(),
        name: faker.commerce.productName(),
        slug: faker.lorem.slug(),
        keyword: faker.lorem.word(),
        reward_blockchain: faker.lorem.word(),
        reward_contract_address: faker.finance.ethereumAddress(),
        reward_amount: faker.number.int({ min: 1, max: 1000 }),
        published: faker.datatype.boolean(),
        reward_ticker: faker.finance.currencyCode(),
        reward_decimals: faker.number.int({ min: 1, max: 18 }),
        logo_url: faker.image.url(),
        cover_image_url: faker.image.url(),
        min_participation_amount: faker.number.int({ min: 1, max: 100 }),
        min_participation_contract: faker.finance.ethereumAddress(),
        min_participation_condition: faker.datatype.boolean(),
        min_participation_contract_symbol: faker.finance.currencyCode(),
        min_participation_contract_decimals: faker.number.int({
          min: 1,
          max: 18,
        }),
        points: {
          tweet: {
            views: 10,
            likes: 10,
            comments: 10,
            retweet: 10,
          },
          reply: {
            views: 10,
            likes: 10,
            comments: 10,
            retweet: 10,
          },
          quote: {
            views: 10,
            likes: 10,
            comments: 10,
            retweet: 10,
          },
        },
      },
    });
    campaigns.push(campaign);
  }

  // Create Tweets
  for (let i = 0; i < 20; i++) {
    const tweet = await prisma.tweets.create({
      data: {
        retweet_count: faker.number.int({ min: 0, max: 100 }),
        reply_count: faker.number.int({ min: 0, max: 100 }),
        like_count: faker.number.int({ min: 0, max: 100 }),
        quote_count: faker.number.int({ min: 0, max: 100 }),
        bookmark_count: faker.number.int({ min: 0, max: 100 }),
        impression_count: faker.number.int({ min: 0, max: 100 }),
        text: faker.lorem.sentence(),
        type: faker.lorem.word(),
        user_id: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        campaign_id:
          campaigns[faker.number.int({ min: 0, max: campaigns.length - 1 })].id,
        tweet_id: faker.string.uuid(),
        score: faker.number.int({ min: 0, max: 100 }),
      },
    });
    tweets.push(tweet);
  }

  // Create Wallets
  for (let i = 0; i < 10; i++) {
    const wallet = await prisma.wallets.create({
      data: {
        user_id: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        address: faker.finance.ethereumAddress(),
        blockchain: faker.lorem.word(),
      },
    });
    wallets.push(wallet);
  }

  // Create CampaignUsers
  for (let i = 0; i < 10; i++) {
    const campaignUser = await prisma.campaignUsers.create({
      data: {
        user_id: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        wallet_id:
          wallets[faker.number.int({ min: 0, max: wallets.length - 1 })].id,
        campaign_id:
          campaigns[faker.number.int({ min: 0, max: campaigns.length - 1 })].id,
        claimed_reward: faker.datatype.boolean(),
        blacklisted: faker.datatype.boolean(),
      },
    });
    campaignUsers.push(campaignUser);
  }

  // Create UserScores
  for (let i = 0; i < 10; i++) {
    const userScore = await prisma.userScores.create({
      data: {
        user_id: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        campaign_id:
          campaigns[faker.number.int({ min: 0, max: campaigns.length - 1 })].id,
        score: faker.number.int({ min: 0, max: 100 }),
        campaign_user_id:
          campaignUsers[
            faker.number.int({ min: 0, max: campaignUsers.length - 1 })
          ].id,
      },
    });
    userScores.push(userScore);
  }

  // Create Invites
  for (let i = 0; i < 5; i++) {
    const invite = await prisma.invites.create({
      data: {
        referrer_id:
          users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        invitee_id:
          users[faker.number.int({ min: 0, max: users.length - 1 })].id,
      },
    });
    invites.push(invite);
  }

  // Create CampaignRetweets
  for (let i = 0; i < 10; i++) {
    const campaignRetweet = await prisma.campaignRetweets.create({
      data: {
        campaign_id:
          campaigns[faker.number.int({ min: 0, max: campaigns.length - 1 })].id,
        url: faker.internet.url(),
        points: faker.number.int({ min: 0, max: 100 }),
      },
    });
    campaignRetweets.push(campaignRetweet);
  }

  // Create CampaignFollowAccounts
  for (let i = 0; i < 5; i++) {
    const campaignFollowAccount = await prisma.campaignFollowAccounts.create({
      data: {
        campaign_id:
          campaigns[faker.number.int({ min: 0, max: campaigns.length - 1 })].id,
        twitter_account: faker.internet.userName(),
        points: faker.number.int({ min: 0, max: 100 }),
      },
    });
    campaignFollowAccounts.push(campaignFollowAccount);
  }

  // Create UsersClaims
  for (let i = 0; i < 10; i++) {
    const usersClaim = await prisma.usersClaims.create({
      data: {
        user_id: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        campaign_id:
          campaigns[faker.number.int({ min: 0, max: campaigns.length - 1 })].id,
        user_score_id:
          userScores[faker.number.int({ min: 0, max: userScores.length - 1 })]
            .id,
        amount: faker.number.int({ min: 0, max: 1000 }),
      },
    });
    usersClaims.push(usersClaim);
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
