/*
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
*/

import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";

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
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'friend',
  }
);

//module.exports = Friend;

export default Friend;
