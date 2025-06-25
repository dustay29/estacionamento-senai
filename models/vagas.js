import { database } from "../database.js";
import { DataTypes } from "sequelize";

const Vagas = database.define("Vagas", {
  // ID primário da vaga, com auto incremento
  id_vaga: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  // Total de vagas disponíveis
  total_vagas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0, // Garante que seja zero ou mais
    },
  },

  // Quantidade de vagas ocupadas
  vagas_ocupadas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0, // Garante que não seja negativo
      // Garante que não ultrapasse o total de vagas
      maxVagas(value) {
        if (value > this.total_vagas) {
          throw new Error("Vagas ocupadas não pode ser maior que o total de vagas.");
        }
      },
    },
  },
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  underscored: true,  // Converte nomes camelCase para snake_case no banco
});

export { Vagas };
