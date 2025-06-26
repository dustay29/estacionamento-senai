import { database } from "../database.js";
import { DataTypes } from "sequelize";
const Acesso = database.define("Acesso", {
  id_acesso: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },

  id_veiculo: {
    type: DataTypes.INTEGER,
    allowNull: true, // Para visitante, pode ser null
  },

  placa: {
    type: DataTypes.STRING,
    allowNull: false
  },

  modelo: {
    type: DataTypes.STRING,
    allowNull: true
  },

  cor: {
    type: DataTypes.STRING,
    allowNull: true
  },

  tipo_veiculo: {
    type: DataTypes.ENUM("Carro", "Moto", "Outro"),
    allowNull: false
  },

  nome_usuario: {
    type: DataTypes.STRING,
    allowNull: true // Pode ser null se visitante não informar nome
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

  autorizado: {
    type: DataTypes.ENUM("Sim", "Não"),
    allowNull: false,
  },

  motivo_bloqueio: {
    type: DataTypes.ENUM("Lotação", "Veículo não autorizado", "Outro"),
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: "Acessos",
  underscored: true,
});

export { Acesso };