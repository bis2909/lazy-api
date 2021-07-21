const getPagination = (start, count) => {
  if ((!start && start !== 0) || (!count && count !== 0)) {
    return {limit: null, offset: null};
  }

  const limit = count || 20;
  const offset = start || 0;

  return { limit, offset };
};

const getPagingData = (data, limit, start) => {
  const { count, rows } = data;

  return { total: count, start: start || 0, ...(limit && {count: limit}), data: rows };
};

const isEmail = email => {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegexp.test(email);
};

module.exports = {
  getPagination,
  getPagingData,
  isEmail
};
