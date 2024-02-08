const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pending extends Model {};

Pending.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNunll: false,
      unique: false
    },
    pendingId: {
      type: DataTypes.INTEGER,
      allowNunll: false,
      unique: false
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'pending',
  }
);

module.exports = Pending;
