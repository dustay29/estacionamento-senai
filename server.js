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
import { Acesso } from './models/acesso.js';
import { Usuarios } from './models/usuario.js';
import { Veiculos } from './models/veiculo.js';
import { Vagas } from './models/vagas.js';
// Conectar ao banco de dados

try {
  const vagasExistentes = await Vagas.findOne();
  if (!vagasExistentes) {
    await Vagas.create({
      total_vagas: 100, // Defina o número máximo de vagas aqui
      vagas_ocupadas: 0,
    });
    console.log("Registro de vagas inicializado com sucesso!");
  }
} catch (erro) {
  console.error("Erro ao inicializar registro de vagas:", erro);
}

// ultilizando json
app.use(express.json());
app.use(router)
// futuro uso do router app.use(router)

try{
    //  await Usuarios.sync({ alter: true })
    //  await Veiculos.sync({ alter: true })
    //  await Acesso.sync({alter:true})
    //  await Vagas.sync({ alter: true });

  
} catch(erro){
    console.log(erro)
}

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})
