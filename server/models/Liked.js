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
    likeByUserId: {
      type: DataTypes.INTEGER,
      allowNunll: false
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
