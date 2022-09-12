const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificultad: {
      type: DataTypes.INTEGER,
      validate: {min: 1, max: 5, },
      allowNull: false,
    },
    Duracion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    temporada: {
      type: DataTypes.ENUM("Summer", "Fall", "Winter", "Spring", "All the year"),
      allowNull: false,
    },
  });
};
