const _ = require('lodash');

const getServiceVariable = name => {
  return `${_.camelCase(name)}Services`;
};

const getIdVariable = name => {
  return `${_.camelCase(name)}Id`;
};

const getRequirePath = (currentFilePath, requireFilePath, requireFileName) => {
  return `${_goToRoot(currentFilePath)}/${requireFilePath}/${requireFileName}`;
};

const _goToRoot = filePath => {
  const response = [];
  const arrayFilePath = filePath.split('/');

  for (const path of arrayFilePath) {
    if (path) {
      response.push('..');
    }
  }

  return response.join('/');
};

module.exports = {
  getServiceVariable,
  getIdVariable,
  getRequirePath
}
