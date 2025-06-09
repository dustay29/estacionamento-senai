// importando o banco de dados
import {database} from "../database.js"
// importando p datatypes
import { DataTypes } from "sequelize"
// importando o modelo de Usuários
import { Usuarios } from "./usuario.js"
// criando a tabela veiculos
const Veiculos = database.define('Veiculos', {
     id_veiculo: {
            primaryKey: true,
            type:DataTypes.INTEGER,
            autoIncrement: true
        },
    placa: {
        type: DataTypes.STRING,
        allowNull:false,
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
    }
})

// criando o relacionamento: um veículo pertence a um usuário
Veiculos.belongsTo(Usuarios, {
    foreignKey: 'id_usuario'
})

export { Veiculos }