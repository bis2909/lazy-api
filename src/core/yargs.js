
const yargs = require('yargs');

const args = yargs
  .help(false)
  .version(false);

const getYArgs = () => {
  return args;
};

module.exports = {
  getYArgs
};
