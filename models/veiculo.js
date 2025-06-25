import { database } from "../database.js";
import { DataTypes } from "sequelize";
import { Usuarios } from "./usuario.js";
import { Vagas } from "./vagas.js";

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
    }
  },
  id_vaga: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vagas,
      key: 'id_vaga'
    }
  }
});

// Associações
Veiculos.belongsTo(Vagas, { foreignKey: 'id_vaga', as: 'vaga' });
Vagas.hasMany(Veiculos, { foreignKey: 'id_vaga', as: 'veiculos' });

export { Veiculos };
