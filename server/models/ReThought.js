const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ReThought extends Model{};

ReThought.init(
  {
    id: {
      type: DataTypes.UUID,
      defulatValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    reThoughtByUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    originalThoughtId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    additionalThoughtId: {
      type: DataTypes.STRING,
      allowNull: true,
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
	

