'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Subject extends Model {
    static associate(models) {}
  }
  User_Subject.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      subjectId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Subject',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      mark: {
        allowNull: false,
        type: DataTypes.REAL,
      },
    },
    {
      sequelize,
      modelName: 'User_Subject',
    }
  );
  return User_Subject;
};
