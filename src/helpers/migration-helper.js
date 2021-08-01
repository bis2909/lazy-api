const _ = require('lodash');
const helpers = require('./index');

const generateTableCreationFile = (args, config) => {
  const migrationName = _generateMigrationName(args);
  const migrationPath = helpers.path.getMigrationPath(migrationName, config);

  helpers.asset.write(
    migrationPath,
    _generateTableCreationFileContent(args)
  );
};

const _generateTableCreationFileContent = args => {
  return helpers.template.render('migrations/create-table.js', {
    tableName: args.tableName,
    attributes: args.attributes,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};

const _generateMigrationName = args => {
  return _.trimStart(_.kebabCase('create-' + args.tableName), '-');
};

module.exports = {
  generateTableCreationFile
};
