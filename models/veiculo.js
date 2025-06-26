import { database } from "../database.js";
import { DataTypes } from "sequelize";
import { Usuarios } from "./usuario.js";

const Veiculos = database.define('Veiculos', {
  id_veiculo: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuarios,
      key: 'id_usuario'
    },
    onDelete: 'CASCADE'
  }
});

// Relacionamento com Usuário
Veiculos.belongsTo(Usuarios, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Usuarios.hasMany(Veiculos, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });

export { Veiculos };
