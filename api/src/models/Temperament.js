const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    ID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {timestamps: false})
};