const { QueryInterface } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE "Users"
      ALTER COLUMN "image"
      TYPE BYTEA
      USING decode("image", 'escape');
    `);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Users", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
