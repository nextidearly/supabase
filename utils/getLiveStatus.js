/**
 * Determines if a campaign is live, calculates the number of days until the campaign ends,
 * and calculates the number of days since the campaign started.
 *
 * @param {Object} campaign - The campaign object.
 * @param {string} campaign.start_date - The start date of the campaign.
 * @param {string} campaign.end_date - The end date of the campaign.
 * @param {boolean} campaign.published - The published status of the campaign.
 * @returns {Object} An object containing the live status, days until the campaign ends, and days since the campaign started.
 * @returns {boolean} isLive - Whether the campaign is live.
 * @returns {number|null} daysUntilEnd - The number of days until the campaign ends, or null if not live.
 * @returns {number} daysSinceStart - The number of days since the campaign started.
 */
const getLiveStatus = (campaign) => {
  const now = new Date(Date.now()); // Ensure UTC
  const startDate = new Date(campaign.start_date + 'Z'); // Ensure UTC
  const endDate = new Date(campaign.end_date + 'Z'); // Ensure UTC
  const isLive = campaign.published && now >= startDate && now <= endDate;
  const daysUntilEnd = isLive
    ? Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : null;
  const daysSinceStart = Math.ceil(
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  return { isLive, daysUntilEnd, daysSinceStart };
};

module.exports = {
  getLiveStatus,
};
