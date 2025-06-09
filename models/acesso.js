// importando o banco de dados
import { database } from "../database.js"
// importando os datatypes
import { DataTypes } from "sequelize"
// importando o modelo de Veículos
import { Veiculos } from "./veiculos.js"

// criando a tabela Acesso
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
  },
  data_hora_entrada: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // preenche automático se não mandar
  },
  data_hora_saida: {
    type: DataTypes.DATE,
    allowNull: true, // só preenche na saída
  },
  autorizado: {
    type: DataTypes.ENUM("Sim", "Não"),
    allowNull: false,
  },
  motivo_bloqueio: {
    type: DataTypes.ENUM("Lotação", "Veículo não autorizado", "Outro"),
    allowNull: true, // só é preenchido se for "Não autorizado"
  },
})

// Relacionamento: um acesso pertence a um veículo
Acesso.belongsTo(Veiculos, {
  foreignKey: "id_veiculo",
})

export { Acesso }
