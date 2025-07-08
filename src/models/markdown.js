"use strict";
const { Model, DataTypes } = require("sequelize");

(module.exports = sequelize),
  (DataTypes) => {
    class Markdown extends Model {
      static associations(models) {}
    }
    Markdown.init(
      {
        contentHTML: DataTypes.TEXT("long"),
        contentMarkdown: DataTypes.TEXT("long"),
        description: DataTypes.TEXT("long"),
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: "Markdown",
      }
    );
    return Markdown;
  };
