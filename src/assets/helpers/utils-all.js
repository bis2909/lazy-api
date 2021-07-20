// Some methods maybe you need
// Require install lodash + moment

const _ = require('lodash');
const moment = require('moment');

const permitParams = (params, fields) => {
  return _.pick(params, fields);
};

const mapObject = (obj, lookUpTable) => {
  const mappedObj = {};

  _.forEach(obj, (value, key) => {
    if (value.toString()) {
      mappedObj[lookUpTable[key]] = value;
    }
  });

  return mappedObj;
};

const convertObjetKeys = (obj, convertKeys) => {
  const newObject = {};

  _.forEach(obj, (value, key) => {
    if (value.toString()) {
      if (convertKeys[key]) {
        newObject[convertKeys[key]] = value;
      } else {
        newObject[key] = value;
      }
    }
  });

  return newObject;
};

const permitCustomer = (customer, fields, lookUpTable) => {
  customer = permitParams(customer, fields);
  customer = mapObject(customer, lookUpTable);

  return customer;
};

const permitAddresses = (addresses, fields, lookUpTable) => {
  addresses = permitParams(addresses, fields);

  if (addresses.data) {
    addresses.data = addresses.data.map(address => {
      return permitAddress(address, fields, lookUpTable);
    });
  }

  return addresses;
};

const permitAddress = (address, fields, lookUpTable) => {
  address = permitParams(address, fields);
  address = mapObject(address, lookUpTable);

  return address;
};

const permitStores = (stores, fields) => {
  stores = permitParams(stores, fields);

  if (stores.data) {
    stores.data = stores.data.map(store => {
      return permitParams(store, fields);
    });
  }

  return stores;
};

const permitProductCategories = (category, fields, lookUpTable) => {
  category = permitParams(category, fields);
  category = mapObject(category, lookUpTable);

  if (category.categories) {
    category.categories = category.categories.filter(subCategory => (subCategory.c_showInMenu === true));
    category.categories = category.categories.map(subCategory => {
      subCategory = permitParams(subCategory, fields);
      return permitProductCategories(subCategory, fields, lookUpTable);
    });
  }

  return category;
};

const permitProducts = (products, fields, lookUpTable) => {
  products = permitParams(products, fields);
  products = mapObject(products, lookUpTable);

  if (products.data) {
    products.data = products.data.map(product => {
      product = permitParams(product, fields);
      return mapObject(product, lookUpTable);
    });
  }

  return products;
};

const permitProduct = (product, fields, lookUpTable) => {
  product = permitParams(product, fields);
  product = mapObject(product, lookUpTable);

  return product;
};

const convertPageURL = (currentURL, domainURL, otherQuery = null) => {
  // You use _ to ignore element/variable/param that you dont want to use
  // This is call destructuring, since you want to get the second element from split()
  let [, parameters] = currentURL.split("?");

  if (otherQuery) {
    parameters = `${parameters}&${otherQuery}`;
  }
  return `${domainURL}?${parameters}`;
};

const getPermitParams = (body, permitFields) => {
  const response = {};

  for (const key in permitFields) {
    if (body[key]) {
      response[key] = body[key];
    }
  }

  return response;
};

const permitOrders = (orders, fields) => {
  orders = permitParams(orders, fields);

  if (orders.data) {
    orders.data = orders.data.map(order => {
      return permitParams(order, fields);
    });
  }

  return orders;
};

const permitProductIds = (products, fields) => {
  products = permitParams(products, fields);

  if (products.data) {
    products.data = products.data.map(product => {
      return permitParams(product, fields);
    });
  }

  return products;
};

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

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

const startOfDay = targetDay => {
  if (!targetDay) return null;

  const formatText = moment(targetDay, 'DD/MM/YYYY').startOf('day').format();
  return (new Date(formatText));
};

const endOfDay = targetDay => {
  if (!targetDay) return null;

  const formatText = moment(targetDay, 'DD/MM/YYYY').endOf('day').format();
  return (new Date(formatText));
};

function getFormatDate(dbDate) {
  if (!dbDate) return '';
  const formatText = moment(dbDate).format('DD/MM/YYYY');
  return formatText;
}

module.exports = {
  permitParams,
  mapObject,
  permitCustomer,
  permitAddresses,
  permitAddress,
  permitStores,
  permitProductCategories,
  permitProducts,
  permitProduct,
  convertPageURL,
  getPermitParams,
  permitOrders,
  permitProductIds,
  convertObjetKeys,
  sleep,
  getPagination,
  getPagingData,
  isEmail,
  startOfDay,
  endOfDay,
  getFormatDate
};
