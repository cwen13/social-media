const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');



class Thought extends Model{};

Thought.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      defaultValue: ""
    },
    type: {
      type: DataTypes.ENUM({ values: ["thought", "rethought", "reply", "other"] }),
      allowNull: false,
      defaultValue: "thought"
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

    
