import { database } from "../database.js";
import { DataTypes } from "sequelize";
import { Veiculos } from "./veiculo.js";

const Acesso = database.define("Acesso", {
  id_acesso: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  id_veiculo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Veiculos,
      key: "id_veiculo",
    },
    onDelete: "CASCADE"
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
  tableName: "vagas",
  underscored: true,
});

Acesso.belongsTo(Veiculos, {
  foreignKey: "id_veiculo",
  onDelete: "CASCADE"
});

export { Acesso };
