
const path = require('path');

const _format = i => {
  return parseInt(i, 10) < 10 ? '0' + i : i;
};

const _getCurrentYYYYMMDDHHmms = () => {
  const date = new Date();
  return [
    date.getUTCFullYear(),
    _format(date.getUTCMonth() + 1),
    _format(date.getUTCDate()),
    _format(date.getUTCHours()),
    _format(date.getUTCMinutes()),
    _format(date.getUTCSeconds()),
  ].join('');
};

const _getPath = config => {
  let result = path.resolve(process.cwd(), config.migrationPath);

  if (path.normalize(result) !== path.resolve(result)) {
    // the path is relative
    result = path.resolve(process.cwd(), result);
  }

  return result;
};

const _addFileExtension = (basename, options) => {
  return [basename, _getFileExtension(options)].join('.');
};

const getMigrationPath = (migrationName, config) => {
  return path.resolve(
    _getPath(config),
    _getFileName('migration', migrationName)
  );
};

const _getFileName = (type, name, options) => {
  return _addFileExtension(
    [_getCurrentYYYYMMDDHHmms(), name ? name : 'unnamed-' + type].join('-'),
    options
  );
};

const _getFileExtension = () => {
  return 'js';
};

const getModelPath = (modelName, config) => {
  return path.resolve(
    _getModelsPath(config),
    _addFileExtension(modelName.toLowerCase())
  );
};

const _getModelsPath = config => {
  return path.resolve(process.cwd(), config.modelPath);
};

const getPathWithName = (currentName, currentPath) => {
  return path.resolve(
    path.resolve(process.cwd(), currentPath),
    _addFileExtension(currentName.toLowerCase())
  );
};

module.exports = {
  getMigrationPath,
  getModelPath,
  getPathWithName
};
