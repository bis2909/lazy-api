const helpers = require('../helpers/index');
const { getConfig } = require('../helpers/config-helper');
const { updateAttributes } = require('../helpers/args-helper');
const { parseJson } = require('../helpers/json-helper');

const {
  generateMigrationFile, generateModelFile, generateControllerFile,
  generateServiceFile, generateHelperFiles, generateRouteFile, generateRouteRequire
} = require('../main');

exports.builder = yargs => {
  return yargs
    .option('path', {
      describe: 'Get path json file',
      type: 'string',
      demandOption: true
    })
    .option('helpers', {
      describe: 'Copy helpers',
      type: 'boolean',
      default: false
    }).argv;
};

exports.handler = async function (argv) {
  const config = getConfig();
  const data = updateAttributes(parseJson(argv.path));

  generateMigrationFile(data, config);
  generateModelFile(data, config);
  generateControllerFile(data, config);
  generateServiceFile(data, config);

  if (argv.helpers) {
    generateHelperFiles(config);
  }

  generateRouteFile(data, config);
  generateRouteRequire(data, config);

  process.exit(0);
};
