import { Vagas } from "../models/vagas.js";

export async function visualizarVagas(req, res) {
  try {
    // Busca o registro de vagas no banco de dados
    const vagas = await Vagas.findOne();

    // Verifica se o registro de vagas existe
    if (!vagas) {
      return res.status(404).json({ mensagem: "Registro de vagas não encontrado. Inicialize as vagas no banco de dados." });
    }

    // Retorna as informações de vagas disponíveis
    res.json({
      total_vagas: vagas.total_vagas,
      vagas_ocupadas: vagas.vagas_ocupadas,
      vagas_disponiveis: vagas.total_vagas - vagas.vagas_ocupadas,
    });
  } catch (error) {
    console.error("Erro ao visualizar vagas:", error);
    res.status(500).json({ mensagem: "Erro no servidor ao buscar vagas." });
  }
}

// atualizarVagas admin
export async function atualizarCapacidadeVagas(req, res) {
  try {
    const { total_vagas } = req.body;

    if (total_vagas === undefined || isNaN(total_vagas) || total_vagas < 0) {
      return res.status(400).json({ mensagem: "total_vagas deve ser um número válido e maior ou igual a 0." });
    }

    const vagas = await Vagas.findOne();

    if (!vagas) {
      return res.status(404).json({ mensagem: "Registro de vagas não encontrado." });
    }

    // Não deixar o total de vagas menor que o número de vagas já ocupadas
    if (total_vagas < vagas.vagas_ocupadas) {
      return res.status(400).json({ mensagem: "Total de vagas não pode ser menor que as vagas já ocupadas." });
    }

    vagas.total_vagas = total_vagas;
    await vagas.save();

    res.json({ mensagem: "Capacidade de vagas atualizada com sucesso.", vagas });
  } catch (error) {
    console.error("Erro ao atualizar vagas:", error);
    res.status(500).json({ mensagem: "Erro no servidor ao atualizar vagas." });
  }
}

