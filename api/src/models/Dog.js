const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightMin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    heightMax: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weightMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
    },
    image: {
      type :DataTypes.STRING,
    },
    createdInDb: {           
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {timestamps: false});
};


// weightMin:parseInt(d.weight.metric.split(' - ')[0]),
//             weightMax:Number.isNaN(parseInt(d.weight.metric.split(' - ')[1])) ? 0 : parseInt(d.weight.metric.split(' - ')[1]),
//             heightMin:parseInt(d.height.metric.split(' - ')[0]),
//             heightMax:Number.isNaN(parseInt(d.height.metric.split(' - ')[1])) ? 0 : parseInt(d.height.metric.split(' - ')[1])
