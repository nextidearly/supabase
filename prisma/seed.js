import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Sample data for User model
    const users = await prisma.user.createMany({
        data: [
            {
                email: 'user1@example.com',
                user_name: 'user1',
                avatar_url: 'https://example.com/avatar1.png',
                twitter_id: '123456789', // Replace with actual IDs
                verified: true,
            },
            {
                email: 'user2@example.com',
                user_name: 'user2',
                avatar_url: 'https://example.com/avatar2.png',
                twitter_id: '987654321',
                verified: false,
            },
            {
                email: 'user3@example.com',
                user_name: 'user3',
                avatar_url: 'https://example.com/avatar3.png',
                twitter_id: '456789123',
                verified: true,
            },
        ],
    });

    // Fetch created users to use their IDs
    const createdUsers = await prisma.user.findMany();

    // Sample data for Project model
    const projects = await prisma.project.createMany({
        data: [
            {
                name: 'Project 1',
                slug: 'project1',
                owner_id: createdUsers[0].id,
            },
            {
                name: 'Project 2',
                slug: 'project2',
                owner_id: createdUsers[1].id,
            },
            {
                name: 'Project 3',
                slug: 'project3',
                owner_id: createdUsers[2].id,
            },
        ],
    });

    // Fetch created projects to use their IDs
    const createdProjects = await prisma.project.findMany();

    // Sample data for Campaign model
    const campaigns = await prisma.campaign.createMany({
        data: [
            {
                admin_id: createdUsers[0].id,
                project_id: createdProjects[0].id,
                start_date: new Date(),
                end_date: new Date(),
                name: 'Campaign 1',
                slug: 'campaign-1',
                keyword: 'Keyword1',
                reward_blockchain: 'Ethereum',
                reward_contract_address: '0x123456789abcdef',
                reward_amount: 100,
                published: true,
                reward_ticker: 'ETH',
                reward_decimals: 18,
                logo_url: 'https://example.com/logo1.png',
                cover_image_url: 'https://example.com/cover1.png',
                min_participation_amount: 10,
                min_participation_contract: '0xcontract123',
                min_participation_condition: true,
                min_participation_contract_symbol: 'ERC20',
                min_participation_contract_decimals: 18,
                points: { points1: 10, points2: 20 },
            },
            {
                admin_id: createdUsers[1].id,
                project_id: createdProjects[1].id,
                start_date: new Date(),
                end_date: new Date(),
                name: 'Campaign 2',
                slug: 'campaign-2',
                keyword: 'Keyword2',
                reward_blockchain: 'Polygon',
                reward_contract_address: '0xabcdef123456789',
                reward_amount: 50,
                published: true,
                reward_ticker: 'MATIC',
                reward_decimals: 18,
                logo_url: 'https://example.com/logo2.png',
                cover_image_url: 'https://example.com/cover1.png',
                min_participation_amount: 100,
                min_participation_contract: '0xcontract456',
                min_participation_condition: false,
                min_participation_contract_symbol: 'ERC721',
                min_participation_contract_decimals: 0,
                points: { points1: 15, points2: 25 },
            },
            {
                admin_id: createdUsers[2].id,
                project_id: createdProjects[2].id,
                start_date: new Date(),
                end_date: new Date(),
                name: 'Campaign 3',
                slug: 'campaign-3',
                keyword: 'Keyword3',
                reward_blockchain: 'Binance Smart Chain',
                reward_contract_address: '0x6789abcdef123456',
                reward_amount: 75,
                published: false,
                reward_ticker: 'BNB',
                reward_decimals: 18,
                logo_url: 'https://example.com/logo3.png',
                cover_image_url: 'https://example.com/cover1.png',
                min_participation_amount: 1,
                min_participation_contract: '0xcontract789',
                min_participation_condition: true,
                min_participation_contract_symbol: 'BEP20',
                min_participation_contract_decimals: 18,
                points: { points1: 5, points2: 10 },
            },
        ],
    });

    // Fetch created campaigns to use their IDs
    const createdCampaigns = await prisma.campaign.findMany();

    // Sample data for Tweet model
    const tweets = await prisma.tweet.createMany({
        data: [
            {
                created_at: new Date(),
                retweet_count: 10,
                reply_count: 5,
                like_count: 20,
                quote_count: 3,
                bookmark_count: 7,
                impression_count: 30,
                text: 'This is tweet 1',
                type: 'original',
                user_id: createdUsers[0].id,
                campaign_id: createdCampaigns[0].id,
                tweet_id: 'tweet1',
                score: 100,
            },
            {
                created_at: new Date(),
                retweet_count: 15,
                reply_count: 8,
                like_count: 25,
                quote_count: 4,
                bookmark_count: 9,
                impression_count: 35,
                text: 'This is tweet 2',
                type: 'retweet',
                user_id: createdUsers[1].id,
                campaign_id: createdCampaigns[1].id,
                tweet_id: 'tweet2',
                score: 150,
            },
            {
                created_at: new Date(),
                retweet_count: 12,
                reply_count: 6,
                like_count: 22,
                quote_count: 2,
                bookmark_count: 8,
                impression_count: 32,
                text: 'This is tweet 3',
                type: 'original',
                user_id: createdUsers[2].id,
                campaign_id: createdCampaigns[2].id,
                tweet_id: 'tweet3',
                score: 120,
            },
        ],
    });

    // Sample data for CampaignRetweet model
    const campaignRetweets = await prisma.campaignRetweet.createMany({
        data: [
            {
                campaign_id: createdCampaigns[0].id,
                url: 'https://twitter.com/campaign1/tweet1',
                points: 50,
            },
            {
                campaign_id: createdCampaigns[1].id,
                url: 'https://twitter.com/campaign2/tweet2',
                points: 40,
            },
            {
                campaign_id: createdCampaigns[2].id,
                url: 'https://twitter.com/campaign3/tweet3',
                points: 60,
            },
        ],
    });

    // Sample data for Wallet model
    const wallets = await prisma.wallet.createMany({
        data: [
            {
                user_id: createdUsers[0].id,
                address: '0xwallet1',
                blockchain: 'Ethereum',
            },
            {
                user_id: createdUsers[1].id,
                address: '0xwallet2',
                blockchain: 'Polygon',
            },
            {
                user_id: createdUsers[2].id,
                address: '0xwallet3',
                blockchain: 'Binance Smart Chain',
            },
        ],
    });

    // Fetch created wallets to use their IDs
    const createdWallets = await prisma.wallet.findMany();

    // Sample data for UserScore model
    const userScores = await prisma.userScore.createMany({
        data: [
            {
                created_at: new Date(),
                user_id: createdUsers[0].id,
                campaign_id: createdCampaigns[0].id,
                score: 200,
            },
            {
                created_at: new Date(),
                user_id: createdUsers[1].id,
                campaign_id: createdCampaigns[1].id,
                score: 180,
            },
            {
                created_at: new Date(),
                user_id: createdUsers[2].id,
                campaign_id: createdCampaigns[2].id,
                score: 220,
            },
        ],
    });

    // Sample data for Invite model
    const invites = await prisma.invite.createMany({
        data: [
            {
                referrer_id: createdUsers[0].id,
                invitee_id: createdUsers[1].id,
            },
            {
                referrer_id: createdUsers[1].id,
                invitee_id: createdUsers[2].id,
            },
            {
                referrer_id: createdUsers[2].id,
                invitee_id: createdUsers[0].id,
            },
        ],
    });

    // Sample data for CampaignUser model
    const campaignUsers = await prisma.campaignUser.createMany({
        data: [
            {
                user_id: createdUsers[0].id,
                wallet_id: createdWallets[0].id,
                campaign_id: createdCampaigns[0].id,
                claimed_reward: true,
                blacklisted: false,
            },
            {
                user_id: createdUsers[1].id,
                wallet_id: createdWallets[1].id,
                campaign_id: createdCampaigns[1].id,
                claimed_reward: false,
                blacklisted: false,
            },
            {
                user_id: createdUsers[2].id,
                wallet_id: createdWallets[2].id,
                campaign_id: createdCampaigns[2].id,
                claimed_reward: true,
                blacklisted: false,
            },
        ],
    });

    console.log('Seed data has been created');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
