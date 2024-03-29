const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blocked extends Model {};

Blocked.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNunll: false
    },
    blockedId: {
      type: DataTypes.INTEGER,
      allowNunll: false
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blocked',
  }
);

module.exports = Blocked;
