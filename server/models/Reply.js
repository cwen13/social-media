const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reply extends Model{};

Reply.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    replyOfId: {
      type: DataTypes.INTEGER,
      allowNull: false
      
    },
    replyThoughtId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'reply',
  }
);

module.exports = Reply;

    
