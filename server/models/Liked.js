const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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

module.exports = Liked;
