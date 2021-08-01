const _ = require('lodash');
const pluralize = require('pluralize');

const updateAttributes = (args) => {
  const { attributes } = args;
  args.modelName = _.upperFirst(_.camelCase(args.name));
  args.tableName = pluralize(_.snakeCase(args.name));
  args.urlName = _.kebabCase(pluralize(args.name));

  const newAttributes = attributes.map(attribute => {
    return {
      ...attribute,
      fieldName: _.snakeCase(attribute.name),
      modelName: _.camelCase(attribute.name)
    };
  });

  args.attributes = newAttributes;

  return args;
};

module.exports = {
  updateAttributes
};
