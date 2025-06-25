import express from "express";
import { 
  login, 
  cadastrarUsuario, 
  atualizarUsuario, 
  removerUsuario, 
  buscarUsuarioLogado 
} from "../controllers/authController.js";
import { 
  listarVeiculos,
  cadastrarVeiculo, 
  atualizarVeiculo, 
  removerVeiculo 
} from "../controllers/veiculosController.js";
//Admin
import { 
  registrarEntrada, 
  registrarSaida, 
  visualizarVagas,
  atualizarCapacidadeVagas,
  listarAcessos
} from "../controllers/acessoController.js";
import {
  adminAtualizarUsuario,
  adminRemoverUsuario,
  adminAtualizarVeiculo,
  adminRemoverVeiculo,
  listarTodosVeiculos,
  listarTodosUsuarios
} from "../controllers/adminController.js";
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

// Acesso (entrada/saída de veículos)
router.post("/acessos/entrada", registrarEntrada);
router.post("/acessos/saida/:id_acesso", registrarSaida);

// Veículos
router.get("/veiculos", listarVeiculos);
router.post("/veiculos", cadastrarVeiculo);
router.put("/veiculos", atualizarVeiculo);
router.delete("/veiculos", removerVeiculo);

// Relatórios e rotas administrativas
router.get("/usuarios", verificarAdmin, listarTodosUsuarios);
router.get("/veiculos/todos", verificarAdmin, listarTodosVeiculos);
router.put("/admin/usuarios", verificarAdmin, adminAtualizarUsuario);
router.delete("/admin/usuarios/:id", verificarAdmin, adminRemoverUsuario);
router.put("/admin/veiculos", verificarAdmin, adminAtualizarVeiculo);
router.delete("/admin/veiculos", verificarAdmin, adminRemoverVeiculo);

router.post("/admin/acessos/entrada", verificarAdmin, registrarEntrada);
router.post("/admin/acessos/saida/:id_acesso", verificarAdmin, registrarSaida);
router.put("/admin/vagas", verificarAdmin, atualizarCapacidadeVagas);
router.get("/admin/acessos", verificarAdmin, listarAcessos);
