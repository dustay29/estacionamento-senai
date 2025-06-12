// importando o banco de dados
import { database } from "../database.js";
// importando os datatypes
import { DataTypes } from "sequelize";

// criando a tabela usuarios
const Usuarios = database.define("Usuarios", {
  id_usuario: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\d{11}$/, // 11 dígitos numéricos
    },
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  tipo_usuario: {
    type: DataTypes.ENUM("Aluno", "Professor", "Funcionário", "Visitante"),
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Por padrão, o usuário não é administrador
  },
});

export { Usuarios };