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
    reThoughtByUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    originalThoughtId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    additionalThoughtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    userscored: true,
    modelName: "reThought"
  }
);



module.exports = ReThought;
	

