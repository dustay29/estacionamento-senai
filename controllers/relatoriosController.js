import { Acesso } from "../models/acesso.js";

export async function listarAcessos(req, res) {
  try {
    const acessos = await Acesso.findAll({
      include: { all: true }, // Inclui dados relacionados (veículos)
    });

    res.json(acessos);
  } catch (error) {
    console.error("Erro ao listar acessos:", error);
    res.status(500).json({ mensagem: "Erro no servidor" });
  }
}