import express from 'express'
import 'dotenv/config'
import cors from 'cors'
// importando  express em uma variavel
const app = express();
//autorizando uso pelo corns
app.use(cors());
// Importar a conexao criada com sequelize
import {database} from './database.js'
import { router } from './routes/routes.js'
import { Veiculos } from './models/veiculo.js';
import { Acesso } from "./models/acesso.js";
import { Usuarios } from "./models/usuario.js";
import { Vagas } from './models/vagas.js';
// Conectar ao banco de dados
// ultilizando json
app.use(express.json());
app.use(router)
// futuro uso do router app.use(router)

try{
// await Acesso.sync({ force: true });
// await Vagas.sync({ force: true });
// await Veiculos.sync({ force: true });
// await Usuarios.sync({ force: true });
// // await database.sync({ force: true });
// console.log("Conexão com o banco de dados estabelecida com sucesso!");
  
} catch(erro){
    console.log(erro)
}


export default app; // Exporta o app para ser usado nos testes