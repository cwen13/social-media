const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notification extends Model{};

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fromUser: {
      type: DataTypes.INTEGER,
      allowNull: false,      
    },
    toUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    friendRequestEntryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },
    followedByEntryId: {
      type: DataTypes.INTEGER,
      allowNulll: true,
      unique: false
    },
    likedThoughtId: {
      type: DataTypes.INTEGER,
      allowNulll: true,
      unique: false
    },
    replyToEntryId: {
      type: DataTypes.INTEGER,
      allowNulll: true,
      unique: false
    },
    reThoughtOfEntryId: {
      type: DataTypes.INTEGER,
      allowNulll: true,
      unique: false
    },
    acknowledge: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      unique: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'notification',
  }
);

module.exports = Notification;
