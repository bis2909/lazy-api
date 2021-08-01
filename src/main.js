const chalk = require('chalk');
const helpers = require('./helpers/index');

const generateMigrationFile = (data, config) => {
  helpers.migration.generateTableCreationFile(data, config);
  console.log('%s Generate migration file', chalk.green.bold('DONE'));
};

const generateModelFile = (data, config) => {
  helpers.model.generateFile(data, config);
  console.log('%s Generate model file', chalk.green.bold('DONE'));
};

const generateControllerFile = (data, config) => {
  helpers.controller.generateFile(data, config);
  console.log('%s Generate controller file', chalk.green.bold('DONE'));
};

const generateServiceFile = (data, config) => {
  helpers.service.generateFile(data, config);
  console.log('%s Generate service file', chalk.green.bold('DONE'));
};

const generateHelperFiles = config => {
  helpers.helper.generateApiErrorFile(config);
  helpers.helper.generateUtilsFile(config);
  console.log('%s Generate helper file', chalk.green.bold('DONE'));
};

const generateRouteFile = (data, config) => {
  helpers.routes.generateFile(data, config);
  console.log('%s Generate route file', chalk.green.bold('DONE'));
};

const generateRouteRequire = (data, config) => {
  const routeName = helpers.routes.generateRouteName(data);
  const routePath = data.routesPath || config.routesPath;
  const varRoute = helpers.utils.getVariable(data.name);
  const require = `./${routePath}/${routeName}`;

  console.log('Copy this 2 line to your index.js file');
  console.log(`const ${varRoute}Router = require('${require}');`);
  console.log(`app.use('/api/v1/${data.urlName}', ${varRoute}Router);`)
}

module.exports = {
  generateMigrationFile,
  generateModelFile,
  generateControllerFile,
  generateServiceFile,
  generateHelperFiles,
  generateRouteFile,
  generateRouteRequire
};
