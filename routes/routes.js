import express from "express";
import { 
  login, 
  cadastrarUsuario, 
  atualizarUsuario, 
  removerUsuario, 
  listarTodosUsuarios, 
  buscarUsuarioLogado 
} from "../controllers/authController.js";
import { 
  listarVeiculos, 
  cadastrarVeiculo, 
  atualizarVeiculo, 
  removerVeiculo 
} from "../controllers/veiculosController.js";
import { 
  registrarEntrada, 
  registrarSaida, 
  visualizarVagas 
} from "../controllers/acessoController.js";
import { listarAcessos } from "../controllers/relatoriosController.js";
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
router.put("/usuarios/:id", atualizarUsuario);
router.delete("/usuarios/:id", removerUsuario);

// Acesso (entrada/saída de veículos)
router.post("/acessos/entrada", registrarEntrada);
router.post("/acessos/saida/:id_acesso", registrarSaida);

// Veículos
router.get("/veiculos", listarVeiculos);
router.post("/veiculos", cadastrarVeiculo);
router.put("/veiculos/:id", atualizarVeiculo);
router.delete("/veiculos/:id", removerVeiculo);

// Relatórios, usuários etc (se quiser proteger com admin, use verificarAdmin)
router.get("/usuarios", listarTodosUsuarios); // opcionalmente router.get("/usuarios", verificarAdmin, listarTodosUsuarios);
