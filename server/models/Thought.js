const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Thought extends Model{};

Thought.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  
    },
    numberOfComments: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'thought',
  }
);

module.exports = Thought;

    
