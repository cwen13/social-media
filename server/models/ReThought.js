const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ReThought extends Model{};

ReThought.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    reThoughtOfId: {
      type: DataTypes.INTEGER,
      allowNull: false
      
    },
    reThoughtThoughtId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'reThought',
  }
);

module.exports = ReThought;

    
