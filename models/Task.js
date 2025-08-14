'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Task.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          not: /^$/, // - не порожній рядок
        },
      },
      deadline: {
        type: DataTypes.DATEONLY,
        validate: {
          // пізніше за вчора // date-fns: const yesturday = addDays(new Date(), -1)
          isAfter: new Date(
            new Date().setDate(new Date().getDate() - 15)
          ).toISOString(),
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
      underscored: true,
    }
  );
  return Task;
};
