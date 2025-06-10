// importando o banco de dados
import {database} from "../database.js"
// importando p datatypes
import { DataTypes } from "sequelize"

// criando a tabela usuarios
const Usuarios = database.define('Usuarios', {
    id_usuario: {
        primaryKey: true,
        type:DataTypes.INTEGER,
        autoIncrement: true
    },
      nome: {
        type: DataTypes.STRING,
        allowNull:false
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
         validate: {
    is: /^\d{11}$/ // 11 dígitos numéricos
  }
    },
    telefone:{
        type: DataTypes.STRING,
        allowNull:false
    },
     email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // checando se é algo como um email
        validate: {
            isEmail: true,
          },
    },
    tipo_usuario: {
        type: DataTypes.ENUM('Aluno', 'Professor', 'Funcionário', 'Visitante'),
        allowNull: false
  },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export {Usuarios}