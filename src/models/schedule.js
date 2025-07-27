"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Định danh các mối quan hệ
      // define association here
      Schedule.belongsTo(models.Allcode, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeTypeDate",
      });

      Schedule.belongsTo(models.User, {
        foreignKey: "doctorId",
        targetKey: "id",
        as: "doctorData",
      });
    }
  }
  Schedule.init(
    {
      // id:DataTypes.INTEGER,
      currentNumber: DataTypes.INTEGER,
      maxNumber: DataTypes.INTEGER,
      date: DataTypes.DATE,
      timeType: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schedule",
      freezeTableName: true,
    }
  );
  return Schedule;
};
