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
// ultilizando json
app.use(express.json());
// futuro uso do router app.use(router)

try{
   // await Tarefa.sync({ alter: true })
    // await Heroi.sync({ force: true })
} catch(erro){
    console.log(erro)
}

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})
