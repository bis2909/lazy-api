const _ = require('lodash');
const helpers = require('./index');

const generateFile = (args, config) => {
  const routeName = _generateRouteName(args);
  const routePath = helpers.path.getPathWithName(routeName, args.routePath || config.routesPath);

  helpers.asset.write(routePath, _generateFileContent(args, config));
};

const _generateRouteName = args => {
  return _.trimStart(_.kebabCase(args.name), '-');
};

const _generateFileContent = (args, config) => {
  const routePath = args.routePath || config.routesPath;
  const controllerPath = args.controllersPath || config.controllersPath;
  const requireControllerPath = helpers.utils.getRequirePath(routePath, controllerPath, helpers.controller.generateControllerName(args));

  return helpers.template.render('routes/routes.js', {
    requireControllerPath: requireControllerPath,
    varDetail: helpers.utils.getVariable(args.name)
  });
};

module.exports = {
  generateFile
};
