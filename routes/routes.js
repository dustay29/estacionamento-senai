import express from 'express'
import { login, cadastrarUsuario } from '../controllers/authController.js'
import { listarVeiculos, criarVeiculo, atualizarVeiculo, removerVeiculo } from '../controllers/veiculosController.js'
import { registrarEntrada, registrarSaida } from "../controllers/acessoController.js"
import { autenticar } from '../middlewares/middleware.js'

export const router = express.Router()

// Rotas públicas
router.post('/login', login)
router.post('/usuarios', cadastrarUsuario)

// Middleware de autenticação
router.use(autenticar)

// Rotas de acesso (controle de entrada e saída)
router.post("/acessos/entrada", registrarEntrada)
router.put("/acessos/saida/:id_acesso", registrarSaida)

// Rotas de veículos
router.get('/veiculos', listarVeiculos)
router.post('/veiculos', criarVeiculo)
router.put('/veiculos/:id', atualizarVeiculo)
router.delete('/veiculos/:id', removerVeiculo)
