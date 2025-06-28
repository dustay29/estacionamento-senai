import express from "express";
// usuarios
import { 
  login, 
  cadastrarUsuario, 
  atualizarUsuario, 
  removerUsuario, 
  buscarUsuarioLogado 
} from "../controllers/authController.js";
// veiculos
import { 
  listarVeiculos,
  cadastrarVeiculo, 
  atualizarVeiculo, 
  removerVeiculo 
} from "../controllers/veiculosController.js";
//Admin acesso
import { 
  registrarEntrada, 
  registrarSaida, 
  listarAcessos
} from "../controllers/acessoController.js";
// admin usuarios e veiculos
import {
  adminAtualizarUsuario,
  adminRemoverUsuario,
  adminAtualizarVeiculo,
  adminRemoverVeiculo,
  listarTodosVeiculos,
  buscarVeiculoPorPlaca,
  listarTodosUsuarios
} from "../controllers/adminController.js";
import { atualizarCapacidadeVagas , visualizarVagas} from "../controllers/vagasController.js";
import { autenticar, verificarAdmin } from "../middlewares/middleware.js";

export const router = express.Router();

// 🔓 ROTAS PÚBLICAS (sem autenticação)
router.post("/login", login);
router.post("/cadastro", cadastrarUsuario);
router.get("/vagas", visualizarVagas);

// 🔒 MIDDLEWARE - tudo abaixo será protegido
router.use(autenticar);

// 🔐 ROTAS PROTEGIDAS (precisam de token)
router.get("/usuarios/me", buscarUsuarioLogado);
router.put("/usuarios/atualizar", atualizarUsuario);
router.delete("/usuarios/delete", removerUsuario);

// Veículos do usuário logado
router.get("/veiculos", listarVeiculos);
router.post("/veiculos", cadastrarVeiculo);
router.put("/veiculos", atualizarVeiculo);
router.delete("/veiculos", removerVeiculo);

// 🔐Relatórios e rotas administrativas🔐
//usuarios
router.get("/admin/usuarios", verificarAdmin, listarTodosUsuarios);
router.put("/admin/usuarios", verificarAdmin, adminAtualizarUsuario);
router.delete("/admin/usuarios", verificarAdmin, adminRemoverUsuario);
//veiculos
router.get("/admin/veiculos", verificarAdmin, listarTodosVeiculos);
router.put("/admin/veiculos", verificarAdmin, adminAtualizarVeiculo);
router.delete("/admin/veiculos", verificarAdmin, adminRemoverVeiculo);
router.get("/admin/veiculos/:placa", verificarAdmin, buscarVeiculoPorPlaca);
// Acesso
router.post("/admin/acessos/entrada", verificarAdmin, registrarEntrada);
router.put("/admin/acessos/saida", verificarAdmin, registrarSaida);
router.get("/admin/acessos", verificarAdmin, listarAcessos);
//vagas
router.put("/admin/vagas", verificarAdmin, atualizarCapacidadeVagas);