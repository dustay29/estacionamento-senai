import express from 'express'
import { login, cadastrarUsuario, atualizarUsuario} from '../controllers/authController.js'
import { listarVeiculos, cadastrarVeiculo, atualizarVeiculo, removerVeiculo } from '../controllers/veiculosController.js'
import { registrarEntrada, registrarSaida } from "../controllers/acessoController.js"
import { autenticar } from '../middlewares/middleware.js'

export const router = express.Router()

// Rotas públicas
router.post('/login', login) // ok
router.post('/usuarios', cadastrarUsuario) //ok
router.put('/usuarios/:id', atualizarUsuario) //ok

// Middleware de autenticação
router.use(autenticar) //ok

// Rotas de acesso (controle de entrada e saída)
router.post("/acessos/entrada", registrarEntrada)
router.post("/acessos/saida/:id_acesso", registrarSaida)

// Rotas de veículos
router.get('/veiculos', listarVeiculos)  // ok
router.post('/veiculos', cadastrarVeiculo)  //ok
router.put('/veiculos/:id', atualizarVeiculo) // ok
router.delete('/veiculos/:id', removerVeiculo) // ok
