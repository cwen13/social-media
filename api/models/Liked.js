/*
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
*/

import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";

class Liked extends Model{};

Liked.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    thoughtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    likedByUserId: {
      type: DataTypes.INTEGER,
      allowNunll: false,
      unique: false
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "liked",
  }
);

//module.exports = Liked;

export default Liked;
