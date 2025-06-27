import { database } from "../database.js";
import { DataTypes } from "sequelize";
import { Veiculos } from "./veiculo.js"; // Importa para associação

const Acesso = database.define("Acesso", {
  id_acesso: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },

  id_veiculo: {
    type: DataTypes.INTEGER,
    allowNull: true, // null para visitantes
  },

  placa: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  visitante: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  nome_visitante: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  telefone_visitante: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_hora_entrada: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  data_hora_saida: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: "Acessos",
  underscored: true,
});

// Associação: Acesso pertence a Veículo
Acesso.belongsTo(Veiculos, { foreignKey: "id_veiculo", as: "veiculo" });
Veiculos.hasMany(Acesso, { foreignKey: "id_veiculo", as: "acessos" });

export { Acesso };
