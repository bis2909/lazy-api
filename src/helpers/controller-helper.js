const _ = require('lodash');
const helpers = require('./index');

const generateFile = (args, config) => {
  const controllerName = generateControllerName(args);
  const controllerPath = helpers.path.getPathWithName(controllerName, args.controllersPath || config.controllersPath);

  helpers.asset.write(controllerPath, _generateFileContent(args, config));
};

const generateControllerName = args => {
  return _.trimStart(_.kebabCase(args.name + '-controllers'), '-');
};

const _generateFileContent = (args, config) => {
  const controllersPath = args.controllersPath || config.controllersPath;
  const servicesPath = args.servicesPath || config.servicesPath;
  const requireServiceName = helpers.service.generateServiceName(args);
  const requireServicePath = helpers.utils.getRequirePath(controllersPath, servicesPath, requireServiceName);

  return helpers.template.render('controllers/controller.js', {
    servicesName: helpers.utils.getServiceVariable(args.name),
    varId: helpers.utils.getIdVariable(args.name),
    requireServicePath: requireServicePath
  });
};

module.exports = {
  generateFile,
  generateControllerName
};
