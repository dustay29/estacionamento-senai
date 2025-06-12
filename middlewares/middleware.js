import jwt from "jsonwebtoken";
import { Usuarios } from "../models/usuario.js";

export const autenticar = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SEGREDO_JWT);
    req.usuarioId = decoded.id;

    const usuario = await Usuarios.findByPk(decoded.id);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    req.isAdmin = usuario.isAdmin; // Adiciona a informação de administrador ao request
    next();
  } catch (erro) {
    console.error("Erro ao verificar token:", erro);
    res.status(401).json({ mensagem: "Token inválido" });
  }
};

export const verificarAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ mensagem: "Acesso negado. Apenas administradores podem realizar esta ação." });
  }
  next();
};