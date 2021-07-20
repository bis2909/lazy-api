const helpers = require('./index');

const generateFile = (args, config) => {
  const modelPath = helpers.path.getModelPath(args.name, config);

  helpers.asset.write(modelPath, _generateFileContent(args));
};

const _generateFileContent = args => {
  return helpers.template.render('models/model.js', {
    modelName: args.modelName,
    tableName: args.tableName,
    attributes: args.attributes,
    createdAt: args.createdAt || 'createdAt',
    updatedAt: args.updatedAt || 'updatedAt'
  });
};

module.exports = {
  generateFile
};
