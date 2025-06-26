import { Veiculos } from "../models/veiculo.js";
import { Acesso } from "../models/acesso.js";
import { Op } from "sequelize";
// 1. POST - Registrar Entrada
export const registrarEntrada = async (req, res) => {
  try {
    const {
      id_veiculo,
      placa,
      modelo,
      cor,
      tipo_veiculo,
      nome_usuario,
      autorizado,
      motivo_bloqueio
    } = req.body;

    const novoAcesso = await Acesso.create({
      id_veiculo,
      placa,
      modelo,
      cor,
      tipo_veiculo,
      nome_usuario,
      autorizado,
      motivo_bloqueio,
      data_hora_entrada: new Date(),
      data_hora_saida: null
    });

    res.status(201).json(novoAcesso);
  } catch (erro) {
    console.error("Erro ao registrar entrada:", erro);
    res.status(500).json({ mensagem: "Erro ao registrar entrada." });
  }
};

// 2. PUT - Registrar Saída
export const registrarSaida = async (req, res) => {
  try {
    const { placa } = req.body;

    if (!placa) {
      return res.status(400).json({ mensagem: "Placa do veículo é obrigatória." });
    }

    // Busca o último acesso dessa placa sem data de saída
    const acesso = await Acesso.findOne({
      where: {
        placa,
        data_hora_saida: null
      },
      order: [['data_hora_entrada', 'DESC']]
    });

    if (!acesso) {
      return res.status(404).json({ mensagem: "Acesso sem saída não encontrado para essa placa." });
    }

    acesso.data_hora_saida = new Date();
    await acesso.save();

    res.json({ mensagem: "Saída registrada com sucesso.", acesso });

  } catch (erro) {
    console.error("Erro ao registrar saída:", erro);
    res.status(500).json({ mensagem: "Erro ao registrar saída." });
  }
};


// 3. GET - Listar Acessos
export const listarAcessos = async (req, res) => {
  try {
      // Aqui mostra os filtros que foram passados na URL
    console.log("Filtros aplicados:", req.query);
    const {
      placa,
      tipo_veiculo,
      nome_usuario,
      autorizado,
      data_inicio,
      data_fim
    } = req.query;

    const filtros = {};

    if (placa) {
      filtros.placa = { [Op.like]: `%${placa}%` };
    }

    if (tipo_veiculo) {
      filtros.tipo_veiculo = tipo_veiculo;
    }

    if (nome_usuario) {
      filtros.nome_usuario = { [Op.like]: `%${nome_usuario}%` };
    }

    if (autorizado) {
      filtros.autorizado = autorizado;
    }

    if (data_inicio && data_fim) {
      filtros.data_hora_entrada = {
        [Op.between]: [new Date(data_inicio), new Date(data_fim)]
      };
    } else if (data_inicio) {
      filtros.data_hora_entrada = {
        [Op.gte]: new Date(data_inicio)
      };
    } else if (data_fim) {
      filtros.data_hora_entrada = {
        [Op.lte]: new Date(data_fim)
      };
    }

    const acessos = await Acesso.findAll({ where: filtros });

    res.json(acessos);
  } catch (erro) {
    console.error("Erro ao listar acessos:", erro);
    res.status(500).json({ mensagem: "Erro ao listar acessos." });
  }
};

