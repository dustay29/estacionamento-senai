    import express from "express";
    import { login, cadastrarUsuario, atualizarUsuario, removerUsuario } from "../controllers/authController.js";
    import { listarVeiculos, cadastrarVeiculo, atualizarVeiculo, removerVeiculo, listarTodosVeiculos } from "../controllers/veiculosController.js";
    import { registrarEntrada, registrarSaida, visualizarVagas } from "../controllers/acessoController.js";
    import { autenticar, verificarAdmin } from "../middlewares/middleware.js";
    import { listarAcessos } from "../controllers/relatoriosController.js";
    import { listarTodosUsuarios } from "../controllers/authController.js";

    export const router = express.Router();

    // Rotas administrativas

// Rotas públicas
router.post("/login", login); // ok
router.post("/cadastro", cadastrarUsuario); // ok
router.put("/usuarios/:id", atualizarUsuario); // ok
router.delete("/usuarios/:id", removerUsuario); // ok

    // Rotas públicas
    router.get("/vagas", visualizarVagas); // Visualizar vagas disponíveis
    router.post("/login", login); // ok
    router.post("/usuarios", cadastrarUsuario); // ok
    router.put("/usuarios/:id", atualizarUsuario); // ok
    router.delete("/usuarios/:id", removerUsuario); // ok

    // Middleware de autenticação
    router.use(autenticar); // ok

    // Rotas de acesso (controle de entrada e saída)
    router.post("/acessos/entrada", registrarEntrada);
    router.post("/acessos/saida/:id_acesso", registrarSaida);

    // Rotas de veículos
    router.get("/veiculos", listarVeiculos); // ok
    router.post("/veiculos", cadastrarVeiculo); // ok
    router.put("/veiculos/:id", atualizarVeiculo); // ok
    router.delete("/veiculos/:id", removerVeiculo); // ok