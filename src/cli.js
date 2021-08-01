const {getYArgs} = require('./core/yargs');
const allCommand = require('./commands/all');
const generateHelpersCommand = require('./commands/helpers');

const yargs = getYArgs();

yargs
  .help()
  .version()
  .command('all', 'Generate Full CRUD', allCommand)
  .command('helpers', 'Generate Helpers Files', generateHelpersCommand)
  .wrap(yargs.terminalWidth())
  .demandCommand(1, 'Please specify a command')
  .help()
  .strict()
  .recommendCommands().argv;
