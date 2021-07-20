const arg = require('arg');
const inquirer = require('inquirer');
const { generateMigrationFile, generateModelFile, generateControllerFile, generateServiceFile } = require('./main');
const { parseJson } = require('./helpers/json-helper');
const { getConfig } = require('./helpers/config-helper');

const parseArgumentsIntoOptions = rawArgs => {
  const args = arg(
    {
      // '--git': Boolean,
      // '--yes': Boolean,
      // '--install': Boolean,
      // '-g': '--git',
      // '-y': '--yes',
      // '-i': '--install'
    },
    {
      argv: rawArgs.slice(2)
    }
  );

  return {
    // skipPrompts: args['--yes'] || false,
    // git: args['--git'] || false,
    // template: args._[0],
    jsonURL: args._[0]
    // runInstall: args['--install'] || false
  };
};

const promptForMissingOptions = async options => {
  // const defaultTemplate = 'JavaScript';

  // if (options.skipPrompts) {
  //   return {
  //     ...options,
  //     template: options.template || defaultTemplate
  //   };
  // }

  // const questions = [];

  // if (!options.template) {
  //   questions.push({
  //     type: 'list',
  //     name: 'template',
  //     message: 'Please choose which project template to use',
  //     choices: ['JavaScript', 'TypeScript'],
  //     default: defaultTemplate
  //   });
  // }

  // if (!options.git) {
  //   questions.push({
  //     type: 'confirm',
  //     name: 'git',
  //     message: 'Initialize a git repository?',
  //     default: false
  //   });
  // }

  // const answers = await inquirer.prompt(questions);

  // return {
  //   ...options,
  //   template: options.template || answers.template,
  //   git: options.git || answers.git
  // };

  if (!options.jsonURL) {
    console.error('%s Missing json file', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  return options;
};

exports.cli = async args => {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  const data = parseJson(options.jsonURL);
  const config = getConfig();
  console.log('data: ', data);
  console.log('config: ', config);
  generateMigrationFile(data, config);
  generateModelFile(data, config);
  generateControllerFile(data, config);
  generateServiceFile(data, config);

  // await createProject(options);
};
