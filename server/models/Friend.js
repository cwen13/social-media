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
    userId: {
      type: DataTypes.INTEGER,
      allowNunll: false
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNunll: false
    },
    sent: {
      type: DataTypes.ENUM("sent", "denied", "mutual", "blocked"),
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'friends',
  }
);
