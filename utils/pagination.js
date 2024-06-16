// Helper function to get pagination parameters
const getPagination = (page, pageSize) => {
  const limit = pageSize ? +pageSize : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

module.exports = { getPagination };
