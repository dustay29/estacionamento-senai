// controllers/acessoController.js
import { Acesso } from "../models/acesso.js";
import { Veiculos } from "../models/veiculos.js";

// Registrar entrada
export async function registrarEntrada(req, res) {
  try {
    const { placa } = req.body;

    const veiculo = await Veiculos.findOne({ where: { placa } });

    if (!veiculo) {
      return res.status(404).json({ mensagem: "Veículo não encontrado" });
    }

    // Aqui você define sua regra de autorização
    const autorizado = veiculo.autorizado === "Sim" ? "Sim" : "Não";

    let motivo_bloqueio = null;
    if (autorizado === "Não") {
      motivo_bloqueio = "Veículo não autorizado"; // ou outro motivo baseado em regras
    }

    const novoAcesso = await Acesso.create({
      id_veiculo: veiculo.id_veiculo,
      autorizado,
      motivo_bloqueio,
      data_hora_entrada: new Date(),
    });

    // Simular liberação de portão
    if (autorizado === "Sim") {
      console.log("Portão liberado para entrada!");
    }

    return res.status(201).json(novoAcesso);
  } catch (error) {
    console.error("Erro ao registrar entrada:", error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
}

// Registrar saída
export async function registrarSaida(req, res) {
  try {
    const { id_acesso } = req.params;

    const acesso = await Acesso.findByPk(id_acesso);

    if (!acesso) {
      return res.status(404).json({ mensagem: "Acesso não encontrado" });
    }

    if (acesso.data_hora_saida) {
      return res.status(400).json({ mensagem: "Saída já registrada" });
    }

    acesso.data_hora_saida = new Date();
    await acesso.save();

    return res.status(200).json({ mensagem: "Saída registrada", acesso });
  } catch (error) {
    console.error("Erro ao registrar saída:", error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
}
