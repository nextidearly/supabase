import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Sample data for User model
    const users = await prisma.user.createManyAndReturn({
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

    // Sample data for Project model
    const projects = await prisma.project.createManyAndReturn({
        data: [
            {
                slug: 'project1',
                owner_id: users[0].id,
            },
            {
                slug: 'project2',
                owner_id: users[1].id,
            },
            {
                slug: 'project3',
                owner_id: users[2].id,
            },
        ],
    });


    // Sample data for Campaign model
    const campaigns = await prisma.campaign.createManyAndReturn({
        data: [
            {
                admin_id: users[0].id,
                project_id: projects[0].id, // Replace with actual project IDs
                start_date: new Date(),
                end_date: new Date(),
                name: 'Campaign 1',
                slug: 'campaign-1',
                hashtag: '#Campaign1',
                blockchain: 'Ethereum',
                contract_address: '0x123456789abcdef',
                owner_address: '0xabcdef123456789',
                reward_amount: 100,
                published: true,
                is_eth: true,
                ticker: 'ETH',
                decimals: 18,
                logo: 'https://example.com/logo1.png',
                is_fake: false,
                min_participation_amount: '0.1 ETH',
                min_participation_contract: '0xcontract123',
                onchain_participation_condition: true,
                min_participation_contract_symbol: 'ERC20',
                min_participation_contract_decimals: 18,
                points: { points1: 10, points2: 20 }, // Replace with actual JSON structure
            },
            {
                admin_id: users[1].id,
                project_id: projects[1].id,
                start_date: new Date(),
                end_date: new Date(),
                name: 'Campaign 2',
                slug: 'campaign-2',
                hashtag: '#Campaign2',
                blockchain: 'Polygon',
                contract_address: '0xabcdef123456789',
                owner_address: '0x123456789abcdef',
                reward_amount: 50,
                published: true,
                is_eth: false,
                ticker: 'MATIC',
                decimals: 18,
                logo: 'https://example.com/logo2.png',
                is_fake: true,
                min_participation_amount: '100 MATIC',
                min_participation_contract: '0xcontract456',
                onchain_participation_condition: false,
                min_participation_contract_symbol: 'ERC721',
                min_participation_contract_decimals: 0,
                points: { points1: 15, points2: 25 },
            },
            {
                admin_id: users[2].id,
                project_id: projects[2].id,
                start_date: new Date(),
                end_date: new Date(),
                name: 'Campaign 3',
                slug: 'campaign-3',
                hashtag: '#Campaign3',
                blockchain: 'Binance Smart Chain',
                contract_address: '0x6789abcdef123456',
                owner_address: '0x789abcdef123456',
                reward_amount: 75,
                published: false,
                is_eth: false,
                ticker: 'BNB',
                decimals: 18,
                logo: 'https://example.com/logo3.png',
                is_fake: false,
                min_participation_amount: '1 BNB',
                min_participation_contract: '0xcontract789',
                onchain_participation_condition: true,
                min_participation_contract_symbol: 'BEP20',
                min_participation_contract_decimals: 18,
                points: { points1: 5, points2: 10 },
            },
        ],
    });

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
                user_id: users[0].id,
                campaign_id: campaigns[0].id,
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
                user_id: users[1].id,
                campaign_id: campaigns[1].id,
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
                user_id: users[2].id,
                campaign_id: campaigns[2].id,
                tweet_id: 'tweet3',
                score: 120,
            },
        ],
    });

    // Sample data for CampaignTweet model
    const campaignTweets = await prisma.campaignTweet.createMany({
        data: [
            {
                campaign_id: campaigns[0].id,
                url: 'https://twitter.com/campaign1/tweet1',
                points: 50,
            },
            {
                campaign_id: campaigns[1].id,
                url: 'https://twitter.com/campaign2/tweet2',
                points: 40,
            },
            {
                campaign_id: campaigns[2].id,
                url: 'https://twitter.com/campaign3/tweet3',
                points: 60,
            },
        ],
    });

    // Sample data for Wallet model
    const wallets = await prisma.wallet.createManyAndReturn({
        data: [
            {
                user_id: users[0].id,
                address: '0xwallet1',
                blockchain: 'Ethereum',
            },
            {
                user_id: users[1].id,
                address: '0xwallet2',
                blockchain: 'Polygon',
            },
            {
                user_id: users[2].id,
                address: '0xwallet3',
                blockchain: 'Binance Smart Chain',
            },
        ],
    });

    // Sample data for UserScore model
    const userScores = await prisma.userScore.createMany({
        data: [
            {
                created_at: new Date(),
                user_id: users[0].id,
                campaign_id: campaigns[0].id,
                score: 200,
            },
            {
                created_at: new Date(),
                user_id: users[1].id,
                campaign_id: campaigns[1].id,
                score: 180,
            },
            {
                created_at: new Date(),
                user_id: users[2].id,
                campaign_id: campaigns[2].id,
                score: 220,
            },
        ],
    });

    // Sample data for Invite model
    const invites = await prisma.invite.createMany({
        data: [
            {
                referrer_id: users[0].id,
                invitee_id: users[1].id,
            },
            {
                referrer_id: users[1].id,
                invitee_id: users[2].id,
            },
            {
                referrer_id: users[2].id,
                invitee_id: users[0].id,
            },
        ],
    });

    // Sample data for CampaignUser model
    const campaignUsers = await prisma.campaignUser.createMany({
        data: [
            {
                user_id: users[0].id,
                wallet_id: wallets[0].id,
                campaign_id: campaigns[0].id,
                claimed_reward: true,
                blacklisted: false,
            },
            {
                user_id: users[1].id,
                wallet_id: wallets[1].id,
                campaign_id: campaigns[1].id,
                claimed_reward: false,
                blacklisted: true,
            },
            {
                user_id: users[2].id,
                wallet_id: wallets[2].id,
                campaign_id: campaigns[2].id,
                claimed_reward: true,
                blacklisted: false,

            },
        ],
    });

    // Sample data for CampaignFollowAccount model
    const campaignFollowAccounts = await prisma.campaignFollowAccount.createMany({
        data: [
            {
                campaign_id: campaigns[0].id,
                twitter_account: 'campaign1_account',
                points: 30,
            },
            {
                campaign_id: campaigns[1].id,
                twitter_account: 'campaign2_account',
                points: 25,
            },
            {
                campaign_id: campaigns[2].id,
                twitter_account: 'campaign3_account',
                points: 35,
            },
        ],
    });

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
