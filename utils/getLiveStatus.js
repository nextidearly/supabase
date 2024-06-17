/**
 * Determines if a campaign is live.
 * @param {Date} now - The current date.
 * @param {Date} startDate - The start date of the campaign.
 * @param {Date} endDate - The end date of the campaign.
 * @returns {boolean} - Whether the campaign is live.
 */
const isCampaignLive = (now, startDate, endDate) =>
  now >= startDate && now < endDate;

/**
 * Determines if a campaign has finished.
 * @param {Date} now - The current date.
 * @param {Date} endDate - The end date of the campaign.
 * @returns {boolean} - Whether the campaign has finished.
 */
const isCampaignFinished = (now, endDate) => now >= endDate;

/**
 * Determines if a campaign's start date is in the future.
 * @param {Date} now - The current date.
 * @param {Date} startDate - The start date of the campaign.
 * @returns {boolean} - Whether the campaign's start date is in the future.
 */
const isCampaignStartingInFuture = (now, startDate) => now < startDate;

/**
 * Calculates the time difference between two dates and returns the difference in days, hours, and minutes.
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

/**
 * Determines the live status and various time-related metrics of a campaign.
 * @param {Object} campaign - The campaign object.
 * @returns {Object} An object containing the live status, whether the campaign starts in the future,
 * whether the campaign has finished, the time until the campaign ends, the time since the campaign started,
 * and the time until the campaign starts.
 * @returns {boolean} isLive - Whether the campaign is live.
 * @returns {boolean} startsInFuture - Whether the campaign's start date is in the future.
 * @returns {boolean} isFinished - Whether the campaign has finished.
 * @returns {Object|null} timeUntilEnd - The time until the campaign ends, or null if not live.
 * @returns {Object|null} timeSinceStart - The time since the campaign started, or null if start date is in future.
 * @returns {Object|null} timeUntilStart - The time until the campaign starts, or null if it has already started.
 */
const getLiveStatus = (campaign) => {
  const isPublished = campaign.published;
  const now = new Date();
  const startDate = new Date(campaign.start_date);
  const endDate = new Date(campaign.end_date);

  if (!isPublished) {
    return {
      isLive: false,
      startsInFuture: false,
      isFinished: false,
      timeUntilEnd: null,
      timeSinceStart: null,
      timeUntilStart: null,
    };
  }

  const startsInFuture = isCampaignStartingInFuture(now, startDate);
  const isLive = isCampaignLive(now, startDate, endDate);
  const isFinished = isCampaignFinished(now, endDate);

  return {
    isLive,
    startsInFuture,
    isFinished,
    timeUntilEnd: isLive ? getTimeDifference(now, endDate) : null,
    timeSinceStart: isLive ? getTimeDifference(startDate, now) : null,
    timeUntilStart: startsInFuture ? getTimeDifference(now, startDate) : null,
  };
};

module.exports = {
  getLiveStatus,
};
