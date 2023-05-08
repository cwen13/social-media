const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Friend extends Model {};

Friend.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userSentId: {
      type: DataTypes.INTEGER,
      allowNunll: false
    },
    userReceiedId: {
      type: DataTypes.INTEGER,
      allowNunll: false
    },
    sent: {
      type: DataTypes.ENUM,
      valures: ["sent", "denied", "mutual"]
    },
    {
      sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'friends',
  }
);
