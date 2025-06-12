import { database } from "../database.js";
import { DataTypes } from "sequelize";

const Vagas = database.define("Vagas", {
  id_vaga: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  total_vagas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vagas_ocupadas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

export { Vagas };