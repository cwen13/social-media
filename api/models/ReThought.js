/*
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
*/

import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";

class ReThought extends Model{};

ReThought.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    reThoughtOfId: {
      type: DataTypes.INTEGER,
      allowNull: false
      
    },
    reThoughtThoughtId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'reThought',
  }
);

//module.exports = ReThought;

export default ReThought;
    
