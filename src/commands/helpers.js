const helpers = require('../helpers/index');
const { getConfig } = require('../helpers/config-helper');

const {
  generateHelperFiles
} = require('../main');

exports.builder = yargs => {
  return yargs;
};

exports.handler = async function (argv) {
  const config = getConfig();

  generateHelperFiles(config);

  process.exit(0);
};
