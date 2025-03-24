'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {//Định danh các mối quan hệ 
      // define association here
    }
  };
  History.init({
    // id:DataTypes.INTEGER,
    // id:DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
   
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};