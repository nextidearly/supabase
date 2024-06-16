/**
 * Determines if a campaign is live, calculates the number of days until the campaign ends,
 * calculates the number of days since the campaign started, and calculates the number of days
 * until the campaign starts if it is in the future.
 *
 * @param {Object} campaign - The campaign object.
 * @param {string} campaign.start_date - The start date of the campaign.
 * @param {string} campaign.end_date - The end date of the campaign.
 * @param {boolean} campaign.published - The published status of the campaign.
 * @returns {Object} An object containing the live status, days until the campaign ends, days since the campaign started,
 * and days until the campaign starts if it is in the future.
 * @returns {boolean} isLive - Whether the campaign is live.
 * @returns {number|null} daysUntilEnd - The number of days until the campaign ends, or null if not live.
 * @returns {number|null} daysSinceStart - The number of days since the campaign started, or null if start date is in future.
 * @returns {boolean} startsInFuture - Whether the campaign's start date is in the future.
 * @returns {boolean} isFinished - Whether the campaign has finished.
 * @returns {Object|null} timeUntilEnd - The time until the campaign ends, or null if not live.
 * @returns {Object|null} timeSinceStart - The time since the campaign started, or null if start date is in future.
 * @returns {Object|null} timeUntilStart - The time until the campaign starts, or null if it has already started.
 */
const getLiveStatus = (campaign) => {
  const now = new Date();
  const startDate = new Date(campaign.start_date);
  const endDate = new Date(campaign.end_date);

  const startsInFuture = now < startDate;
  const isLive = campaign.published && now >= startDate && now <= endDate;
  const isFinished = now > endDate;

  const timeUntilEnd = isLive ? getTimeDifference(now, endDate) : null;
  const timeSinceStart = !startsInFuture
    ? getTimeDifference(startDate, now)
    : null;
  const timeUntilStart = startsInFuture
    ? getTimeDifference(now, startDate)
    : null;

  return {
    isLive,
    startsInFuture,
    isFinished,
    timeUntilEnd,
    timeSinceStart,
    timeUntilStart,
  };
};

/**
 * Calculates the time difference between two dates and returns the difference in days, hours, and minutes.
 *
 * @param {Date} start - The start date.
 * @param {Date} end - The end date.
 * @returns {Object} An object containing the difference in days, hours, and minutes.
 * @returns {number} days - The number of full days between the two dates.
 * @returns {number} hours - The number of hours remaining after accounting for full days.
 * @returns {number} minutes - The number of minutes remaining after accounting for full hours.
 */
const getTimeDifference = (start, end) => {
  const diffMs = end - start;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return { days: diffDays, hours: diffHours, minutes: diffMinutes };
};

module.exports = {
  getLiveStatus,
};
