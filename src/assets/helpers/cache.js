// TODO: install redis ---> `npm i redis`

const { promisify } = require('util');
const config = {redis: {port: 6379, host: '127.0.0.1'}} // TODO: should use ENV
const redis = require('redis');
const redis_client = redis.createClient(config.redis);
const getAsync = promisify(redis_client.get).bind(redis_client);

const set = (key, value, minutes) => {
  redis_client.setex(key, minutes * 60, value);
};

const get = key => {
  return getAsync(key);
};

module.exports = {
  set,
  get
};
