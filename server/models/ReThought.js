const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ReThought extends Model{};

ReThought.init(
  {
    id: {
      type.DataTypes.UUID,
      defulatValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    originalThoughtId: {
      type.DataTypes.UUID,
      allowNull: false
    },
    originalThoughtUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reThoughtByUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    additionalContent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    additionalThought: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    {
      sequelize,
      freezeTableName: true,
      userscored: true,
      modelName: "reThought"
    }
  }
);


module.exports = ReThought;
	

