const _ = require('lodash');
const helpers = require('./index');

const generateServiceName = args => {
  return _.trimStart(_.snakeCase(args.name + '_services'), '_');
};

module.exports = {
  generateServiceName
};
