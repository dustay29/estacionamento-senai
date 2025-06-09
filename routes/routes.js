import express from 'express'
import { login, cadastrarUsuario } from '../controllers/authController.js'
import { listarVeiculos, criarVeiculo, atualizarVeiculo, removerVeiculo } from '../controllers/veiculosController.js'
import { autenticar } from '../middlewares/middleware.js'

export const router = express.Router()

router.post('/login', login)
router.post('/usuarios', cadastrarUsuario)

router.use(autenticar)

router.get('/veiculos', listarVeiculos)
router.post('/veiculos', criarVeiculo)
router.put('/veiculos/:id', atualizarVeiculo)
router.delete('/veiculos/:id', removerVeiculo)