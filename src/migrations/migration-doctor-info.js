"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("doctor_info", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      doctorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      priceId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      provinceId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      paymentId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      addressClinic: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nameClinic: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
      count: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 0,
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
    await queryInterface.dropTable("doctor_info");
  },
};
