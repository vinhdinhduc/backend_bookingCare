'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {//Định danh các mối quan hệ 
      // define association here
    }
  };
  Specialty.init({
    // id:DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
 
  }, {
    sequelize,
    modelName: 'Specialty',
  });
  return Specialty;
};