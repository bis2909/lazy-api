const _ = require('lodash');
const helpers = require('./index');

const generateTableCreationFileContent = args => {
  return helpers.template.render('migrations/create-table.js', {
    tableName: args.tableName,
    attributes: args.attributes,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};

const generateMigrationName = args => {
  return _.trimStart(_.kebabCase('create-' + args.tableName), '-');
};

const generateTableCreationFile = (args, config) => {
  const migrationName = generateMigrationName(args);
  const migrationPath = helpers.path.getMigrationPath(migrationName, config);

  helpers.asset.write(
    migrationPath,
    generateTableCreationFileContent(args)
  );
};

module.exports = {
  generateTableCreationFile
};
