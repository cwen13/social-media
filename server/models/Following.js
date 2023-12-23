const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Following extends Model {};

Following.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNunll: false
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNunll: false
    },    
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "following"
  }
);

module.exports = Following
