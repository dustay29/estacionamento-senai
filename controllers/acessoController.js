import { Acesso } from "../models/acesso.js";
import { Veiculos } from "../models/veiculo.js";
import { Vagas } from "../models/vagas.js";
import { Op } from 'sequelize';

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



export async function listarAcessos(req, res) {
  try {
    const { placa, data_inicio, data_fim, id_usuario } = req.query;

    // Filtro base
    let where = {};
    let include = [{
      model: Veiculos,
      as: 'veiculo'
    }];

    if (placa) {
      include[0].where = { placa };
    }

    if (id_usuario) {
      include[0].where = {
        ...include[0].where,
        id_usuario
      };
    }

    if (data_inicio || data_fim) {
      where.data_hora_entrada = {};

      if (data_inicio) {
        where.data_hora_entrada[Op.gte] = new Date(data_inicio);
      }

      if (data_fim) {
        where.data_hora_entrada[Op.lte] = new Date(data_fim);
      }
    }

    const acessos = await Acesso.findAll({
      where,
      include,
      order: [['data_hora_entrada', 'DESC']]
    });

    res.json(acessos);
  } catch (error) {
    console.error("Erro ao listar acessos:", error);
    res.status(500).json({ mensagem: "Erro ao buscar acessos." });
  }
}
