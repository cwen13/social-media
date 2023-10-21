const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Liked extends Model{};

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    thoughtId: {
      type: DataTypes.UUID,
      allowNunll: false
    },
    likeByUser: {
      type: DataTypes.INTEGER,
      allowNunll: false
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'like',
  }
);

module.exports = Like;
