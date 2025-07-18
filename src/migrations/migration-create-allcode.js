"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("allcodes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      keyMap: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      valueEn: {
        type: Sequelize.STRING,
      },
      valueVi: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("allcodes");
  },
};
