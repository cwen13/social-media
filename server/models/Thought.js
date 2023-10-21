const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Thought extends Model{};

Thought.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
      validate: {
	isNumeric: true,
      }
    },
    likedBy: {
      type: DataTypes.INTEGER,
      allownull: true,
      unique: false,
      validate: {
	isNumeric: true
      }
    },
    reply: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    replyId: {
      type:DataTypes.UUID,
      allowNull: true
    }
    reThought: {
      type: DataTypes.BOOLEAN,
      allownNull: false,
    },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'thought',
  }
);

module.exports = Thought;

    
