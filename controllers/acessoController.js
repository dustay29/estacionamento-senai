import { Acesso } from "../models/acesso.js";
import { Veiculos } from "../models/veiculo.js";
import { Vagas } from "../models/vagas.js";

// Registrar entrada
export async function registrarEntrada(req, res) {
  try {
    const { placa } = req.body;

    const veiculo = await Veiculos.findOne({ where: { placa } });

    if (!veiculo) {
      return res.status(404).json({ mensagem: "Veículo não encontrado" });
    }

    const autorizado = veiculo.autorizado === "Sim" ? "Sim" : "Não";
    let motivo_bloqueio = null;

    if (autorizado === "Não") {
      motivo_bloqueio = "Veículo não autorizado";
    } else {
      const vagas = await Vagas.findOne();
      if (vagas.vagas_ocupadas >= vagas.total_vagas) {
        motivo_bloqueio = "Lotação";
        autorizado = "Não";
      } else {
        vagas.vagas_ocupadas += 1;
        await vagas.save();
      }
    }

    const novoAcesso = await Acesso.create({
      id_veiculo: veiculo.id_veiculo,
      autorizado,
      motivo_bloqueio,
      data_hora_entrada: new Date(),
    });

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

    const vagas = await Vagas.findOne();
    vagas.vagas_ocupadas -= 1;
    await vagas.save();

    return res.status(200).json({ mensagem: "Saída registrada", acesso });
  } catch (error) {
    console.error("Erro ao registrar saída:", error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
}

// Visualizar vagas disponíveis
export async function visualizarVagas(req, res) {
  try {
    const vagas = await Vagas.findOne();
    res.json({
      total_vagas: vagas.total_vagas,
      vagas_ocupadas: vagas.vagas_ocupadas,
      vagas_disponiveis: vagas.total_vagas - vagas.vagas_ocupadas,
    });
  } catch (error) {
    console.error("Erro ao visualizar vagas:", error);
    res.status(500).json({ mensagem: "Erro no servidor" });
  }
}