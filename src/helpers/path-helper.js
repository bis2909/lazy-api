// import path from 'path';
// import fs from 'fs';
const path = require('path');

// const resolve = require('resolve').sync;
// import getYArgs from '../core/yargs';

// const args = getYArgs().argv;

const format = i => {
  return parseInt(i, 10) < 10 ? '0' + i : i;
};

const getCurrentYYYYMMDDHHmms = () => {
  const date = new Date();
  return [
    date.getUTCFullYear(),
    format(date.getUTCMonth() + 1),
    format(date.getUTCDate()),
    format(date.getUTCHours()),
    format(date.getUTCMinutes()),
    format(date.getUTCSeconds()),
  ].join('');
};

const getPath = config => {
  let result = path.resolve(process.cwd(), config.migrationPath);

  if (path.normalize(result) !== path.resolve(result)) {
    // the path is relative
    result = path.resolve(process.cwd(), result);
  }

  return result;
};

const addFileExtension = (basename, options) => {
  return [basename, getFileExtension(options)].join('.');
};

const getMigrationPath = (migrationName, config) => {
  return path.resolve(
    getPath(config),
    getFileName('migration', migrationName)
  );
};

const getFileName = (type, name, options) => {
  return addFileExtension(
    [getCurrentYYYYMMDDHHmms(), name ? name : 'unnamed-' + type].join('-'),
    options
  );
};

const getFileExtension = () => {
  return 'js';
};

const getModelPath = (modelName, config) => {
  return path.resolve(
    getModelsPath(config),
    addFileExtension(modelName.toLowerCase())
  );
};

const getModelsPath = config => {
  return path.resolve(process.cwd(), config.modelPath);
};

const getControllerPath = (controllerName, controllerPath) => {
  return path.resolve(
    getControllersPath(controllerPath),
    addFileExtension(controllerName.toLowerCase())
  );
};

const getControllersPath = controllerPath => {
  return path.resolve(process.cwd(), controllerPath);
};

module.exports = {
  getMigrationPath,
  getModelPath,
  getControllerPath
};

// module.exports = {
//   getPath(type) {
//     type = type + 's';

//     let result = args[type + 'Path'] || path.resolve(process.cwd(), type);

//     if (path.normalize(result) !== path.resolve(result)) {
//       // the path is relative
//       result = path.resolve(process.cwd(), result);
//     }

//     return result;
//   },

//   getFileName(type, name, options) {
//     return this.addFileExtension(
//       [getCurrentYYYYMMDDHHmms(), name ? name : 'unnamed-' + type].join('-'),
//       options
//     );
//   },

//   getFileExtension() {
//     return 'js';
//   },

//   addFileExtension(basename, options) {
//     return [basename, this.getFileExtension(options)].join('.');
//   },

//   getMigrationPath(migrationName) {
//     return path.resolve(
//       this.getPath('migration'),
//       this.getFileName('migration', migrationName)
//     );
//   },

//   getSeederPath(seederName) {
//     return path.resolve(
//       this.getPath('seeder'),
//       this.getFileName('seeder', seederName)
//     );
//   },

//   getModelsPath() {
//     return args.modelsPath || path.resolve(process.cwd(), 'models');
//   },

//   getModelPath(modelName) {
//     return path.resolve(
//       this.getModelsPath(),
//       this.addFileExtension(modelName.toLowerCase())
//     );
//   },

//   resolve(packageName) {
//     let result;

//     try {
//       result = resolve(packageName, { basedir: process.cwd() });
//       result = require(result);
//     } catch (e) {
//       try {
//         result = require(packageName);
//       } catch (err) {
//         // ignore error
//       }
//     }

//     return result;
//   },

//   existsSync(pathToCheck) {
//     if (fs.accessSync) {
//       try {
//         fs.accessSync(pathToCheck, fs.R_OK);
//         return true;
//       } catch (e) {
//         return false;
//       }
//     } else {
//       return fs.existsSync(pathToCheck);
//     }
//   },
// };