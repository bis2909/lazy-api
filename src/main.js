const chalk = require('chalk');
const fs = require('fs');
const ncp = require('ncp');
const path = require('path');
const {promisify} = require('util');
const execa = require('execa');
const Listr = require('listr');
const { projectInstall } = require('pkg-install');
const helpers = require('./helpers/index');

const access = promisify(fs.access);
const copy = promisify(ncp);

const copyTemplateFiles = async options => {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  });
};

const initGit = async options => {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory
  });

  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize Git'));
  }

  return;
};

const createProject = async options => {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd()
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../templates',
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options)
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git
    },
    {
      title: 'Install dependencies',
      task: () => projectInstall({
        cwd: options.targetDirectory
      }),
      skip: () => !options.runInstall ? 'Pass --install to automatically install dependencies' : undefined
    }
  ]);

  await tasks.run();

  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
};

const generateMigrationFile = async (data, config) => {
  helpers.migration.generateTableCreationFile(data, config);
  console.log('%s Generate migration file', chalk.green.bold('DONE'));
};

const generateModelFile = async (data, config) => {
  helpers.model.generateFile(data, config);
  console.log('%s Generate model file', chalk.green.bold('DONE'));
};

const generateControllerFile = async (data, config) => {
  helpers.controller.generateFile(data, config);
  console.log('%s Generate controller file', chalk.green.bold('DONE'));
};

const generateServiceFile = async (data, config) => {
  helpers.service.generateFile(data, config);
  console.log('%s Generate service file', chalk.green.bold('DONE'));
};

const generateHelperFiles = async config => {
  helpers.helper.generateApiErrorFile(config);
  helpers.helper.generateUtilsFile(config);
  console.log('%s Generate helper file', chalk.green.bold('DONE'));
};

const generateRouteFile = async (data, config) => {
  helpers.routes.generateFile(data, config);
  console.log('%s Generate route file', chalk.green.bold('DONE'));
};

module.exports = {
  createProject,
  generateMigrationFile,
  generateModelFile,
  generateControllerFile,
  generateServiceFile,
  generateHelperFiles,
  generateRouteFile
};