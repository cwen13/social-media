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
    friendRequestFromId: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    followedById: {
      type: DataTypes.BOOLEAN,
      allowNulll: true,
    },
    likedThoughtId: {
      type: DataTypes.INTEGER,
      allowNulll: true,
    },
    LikedThoughtById: {
      type: DataTypes.INTEGER,
      allowNulll: true,
    },
    replyToId: {
      type: DataTypes.INTEGER,
      allowNulll: true,
    },
    replyById: {
      type: DataTypes.INTEGER,
      allowNulll: true,
    },
    reThouhghtId: {
      type: DataTypes.INTEGER,
      allowNulll: true,
    },
    reThoughtById: {
      type: DataTypes.INTEGER,
      allowNulll: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'notificaiton',
  }
);

module.exports = Notification;
