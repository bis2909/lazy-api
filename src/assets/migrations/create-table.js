'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('<%= tableName %>', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      <% attributes.forEach(function(attribute) { %>
        <%= attribute.fieldName %>: {
          type: Sequelize.<%= attribute.type ? `${attribute.type.toUpperCase()}` : 'STRING' %>,
          <%= (!attribute.allowNull && attribute.allowNull !== false) ? '' : `allowNull: ${attribute.allowNull},` %>
          <%= (attribute.type.toUpperCase() === 'STRING' && attribute.defaultValue) ? `defaultValue: '${attribute.defaultValue}',` : '' %>
          <%= (!attribute.defaultValue && attribute.defaultValue !== false) ? '' : ((attribute.type.toUpperCase() !== 'STRING') ? `defaultValue: ${attribute.defaultValue},` : '') %>
          <%= attribute.references ? `references: ${attribute.references},` : '' %>
        },
      <% }) %>

      <%= createdAt %>: {
        allowNull: false,
        type: Sequelize.DATE
      },

      <%= updatedAt %>: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('<%= tableName %>');
  }
};
