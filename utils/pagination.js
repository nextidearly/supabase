/**
 * Helper function to get pagination parameters
 *
 * @param {number|string} page - The current page number
 * @param {number|string} pageSize - The number of items per page
 * @returns {{ limit: number, offset: number }} - An object containing the limit and offset for pagination
 *
 * @example
 * // returns { limit: 10, offset: 0 }
 * getPagination(0, 10);
 *
 * @example
 * // returns { limit: 20, offset: 20 }
 * getPagination(1, 20);
 */
const getPagination = (page, pageSize) => {
  const limit = pageSize ? +pageSize : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

module.exports = { getPagination };
