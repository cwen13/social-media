const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require("./User");

class Friend extends Model {};

Friend.init(
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
    friendId: {
      type: DataTypes.INTEGER,
      allowNunll: false
    },
    status: {
      type: DataTypes.ENUM("pending", "denied", "mutual", "blocked"),
      allowNull: false,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'friend',
  }
);

module.exports = Friend;
