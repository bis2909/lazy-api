const _ = require('lodash');
const helpers = require('./index');

const generateFile = (args, config) => {
  const serviceName = generateServiceName(args);
  const servicePath = helpers.path.getPathWithName(serviceName, config.servicesPath);

  helpers.asset.write(servicePath, _generateFileContent(args, config));
};

const generateServiceName = args => {
  return _.trimStart(_.kebabCase(args.name + '-services'), '-');
};

const _generateFileContent = (args, config) => {
  const servicesPath = args.servicesPath || config.servicesPath;
  const requireHelpersPath = helpers.utils.getRequireHelpersModelsPath(servicesPath, config.helpersPath);
  const requireModelsPath = helpers.utils.getRequireHelpersModelsPath(servicesPath, config.modelPath);

  return helpers.template.render('services/services.js', {
    requireHelpersPath: requireHelpersPath,
    modelName: args.modelName,
    requireModelsPath: requireModelsPath,
    varDetail: helpers.utils.getVariable(args.name),
    varId: helpers.utils.getIdVariable(args.name)
  });
};

module.exports = {
  generateServiceName,
  generateFile
};
