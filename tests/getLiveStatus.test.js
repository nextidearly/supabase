const { getLiveStatus } = require('../utils/getLiveStatus');

/**
 * Creates a spoofed campaign object with a start date in the future.
 *
 * @param {number} offsetMinutes - Number of minutes to offset the start date.
 * @param {number} durationMinutes - Duration of the campaign in minutes.
 * @param {boolean} published - Whether the campaign is published.
 * @returns {Object} The spoofed campaign object.
 */
const createSpoofedCampaign = (offsetMinutes, durationMinutes, published) => {
  const now = new Date();
  const startDate = now;
  startDate.setMinutes(now.getMinutes() + offsetMinutes);

  const endDate = new Date(startDate);
  endDate.setMinutes(startDate.getMinutes() + durationMinutes);

  return {
    created_at: now.toISOString(),
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    published: published,
  };
};

beforeAll(() => {
  const MockDate = require('mockdate');
  MockDate.set(new Date()); // Freeze time to a specific date
});

afterAll(() => {
  const MockDate = require('mockdate');
  MockDate.reset(); // Reset the mocked date
});

describe('getLiveStatus', () => {
  test('Campaign started 1 minute ago', () => {
    const spoofedCampaign = createSpoofedCampaign(-1, 30 * 24 * 60, true);
    const status = getLiveStatus(spoofedCampaign);

    expect(status.isLive).toBe(true);
    expect(status.isFinished).toBe(false);
    expect(status.timeUntilEnd).toEqual({
      days: 29,
      hours: 23,
      minutes: 59,
    });
    expect(status.timeSinceStart).toEqual({
      days: 0,
      hours: 0,
      minutes: 1,
    });
    expect(status.timeUntilStart).toBeNull();
  });

  test('Campaign starts in 1 minute', () => {
    const spoofedCampaign = createSpoofedCampaign(1, 30 * 24 * 60, true);
    const status = getLiveStatus(spoofedCampaign);

    expect(status.isLive).toBe(false);
    expect(status.isFinished).toBe(false);
    expect(status.timeUntilEnd).toBeNull();
    expect(status.timeSinceStart).toBeNull();
    expect(status.timeUntilStart).toEqual({
      days: 0,
      hours: 0,
      minutes: 1,
    });
  });

  test('Campaign starts now and is unpublished', () => {
    const spoofedCampaign = createSpoofedCampaign(0, 30 * 24 * 60, false);
    const status = getLiveStatus(spoofedCampaign);

    expect(status.isLive).toBe(false);
    expect(status.isFinished).toBe(false);
    expect(status.timeUntilEnd).toBeNull();
    expect(status.timeSinceStart).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
    });
    expect(status.timeUntilStart).toBeNull();
  });

  test('Campaign ended 1 minute ago', () => {
    const spoofedCampaign = createSpoofedCampaign(
      -31 * 24 * 60,
      30 * 24 * 60,
      true,
    );
    const status = getLiveStatus(spoofedCampaign);

    expect(status.isLive).toBe(false);
    expect(status.isFinished).toBe(true);
    expect(status.timeUntilEnd).toBeNull();
    expect(status.timeSinceStart).toEqual({
      days: 31,
      hours: 0,
      minutes: 0,
    });
    expect(status.timeUntilStart).toBeNull();
  });

  test('Campaign starts in 1 day', () => {
    const spoofedCampaign = createSpoofedCampaign(24 * 60, 30 * 24 * 60, true);
    const status = getLiveStatus(spoofedCampaign);

    expect(status.isLive).toBe(false);
    expect(status.isFinished).toBe(false);
    expect(status.timeUntilEnd).toBeNull();
    expect(status.timeSinceStart).toBeNull();
    expect(status.timeUntilStart).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
    });
  });

  test('Campaign starts 1 minute ago and ends in 1 minute', () => {
    const spoofedCampaign = createSpoofedCampaign(-1, 2, true);
    const status = getLiveStatus(spoofedCampaign);

    expect(status.isLive).toBe(true);
    expect(status.isFinished).toBe(false);
    expect(status.timeUntilEnd).toEqual({
      days: 0,
      hours: 0,
      minutes: 1,
    });
    expect(status.timeSinceStart).toEqual({
      days: 0,
      hours: 0,
      minutes: 1,
    });
    expect(status.timeUntilStart).toBeNull();
  });
});
