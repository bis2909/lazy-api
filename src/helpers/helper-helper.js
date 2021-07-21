// const _ = require('lodash');
const helpers = require('./index');

const generateApiErrorFile = (config) => {
  const helperName = 'api-error-helper';
  const helperPath = helpers.path.getHelperPath(helperName, config.helpersPath);
  const template = helpers.template.renderWithoutJsBeautiful('helpers/api-error.js');

  helpers.asset.write(helperPath, template);
};

const generateUtilsFile = (config) => {
  const helperName = 'utils-helper';
  const helperPath = helpers.path.getHelperPath(helperName, config.helpersPath);
  const template = helpers.template.renderWithoutJsBeautiful('helpers/utils.js');

  helpers.asset.write(helperPath, template);
};

module.exports = {
  generateApiErrorFile,
  generateUtilsFile
};
