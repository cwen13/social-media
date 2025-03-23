/*
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
*/

import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";


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

//module.exports = Blocked;

export default Blocked;
