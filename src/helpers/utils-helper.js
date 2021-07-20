const _ = require('lodash');

const getServiceVariable = name => {
  return `${_.camelCase(name)}Services`;
};

const getIdVariable = name => {
  return `${_.camelCase(name)}Id`;
};

const getVariable = name => {
  return _.camelCase(name);
};

const getRequirePath = (currentFilePath, requireFilePath, requireFileName) => {
  return `${_goToRoot(currentFilePath)}/${requireFilePath}/${requireFileName}`;
};

const getRequireHelpersModelsPath = (currentFilePath, requireFilePath) => {
  return `${_goToRoot(currentFilePath)}/${requireFilePath}`;
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
  getRequirePath,
  getRequireHelpersModelsPath,
  getVariable
}
