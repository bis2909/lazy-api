'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class <%= modelName %> extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };

  <%= modelName %>.init({
    <% attributes.forEach(function(attribute, index) { %>
      <%= attribute.modelName %>: {
        type: DataTypes.<%= attribute.modelType ? attribute.modelType.toUpperCase() : attribute.type.toUpperCase() %>,
        <%= (!attribute.allowNull && attribute.allowNull !== false) ? '' : `allowNull: ${attribute.allowNull},` %>
        <%= (attribute.type.toUpperCase() === 'STRING' && attribute.defaultValue) ? `defaultValue: '${attribute.defaultValue}',` : '' %>
        <%= (!attribute.defaultValue && attribute.defaultValue !== false) ? '' : ((attribute.type.toUpperCase() !== 'STRING') ? `defaultValue: ${attribute.defaultValue},` : '') %>
        <%= attribute.values ? `values: ['${attribute.values.join(`', '`)}'],` : '' %>
        <%= attribute.fieldName ? `field: '${attribute.fieldName}',` : '' %>
      }<%= (Object.keys(attributes).length - 1) > index ? ',' : '' %>
    <% }) %>
  }, {
    sequelize,
    modelName: '<%= modelName %>',
    tableName: '<%= tableName %>',
    timestamps: true,
    createdAt: '<%= createdAt %>',
    updatedAt: '<%= updatedAt %>',
    underscored: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });

  return <%= modelName %>;
};
