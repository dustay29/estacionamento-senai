import { Veiculos } from "../models/veiculo.js";
import { Acesso } from "../models/acesso.js";
import { Usuarios } from "../models/usuario.js";
import { Op } from "sequelize";
// 1. POST - Registrar Entrada
export const registrarEntrada = async (req, res) => {
  try {
    const {
      id_veiculo,
      placa,
      visitante = false,
      nome_visitante = null,
      telefone_visitante = null,
    } = req.body;

    // Caso não seja visitante, id_veiculo deve existir
    if (!visitante && !id_veiculo) {
      return res.status(400).json({ mensagem: "id_veiculo é obrigatório para veículos cadastrados." });
    }

    // Para visitante, id_veiculo deve ser null
    const novoAcesso = await Acesso.create({
      id_veiculo: visitante ? null : id_veiculo,
      placa,
      visitante,
      nome_visitante: visitante ? nome_visitante : null,
      telefone_visitante: visitante ? telefone_visitante : null,
      data_hora_entrada: new Date(),
      data_hora_saida: null,
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
        data_hora_saida: null,
      },
      order: [['data_hora_entrada', 'DESC']],
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
    const {
      placa,
      tipo_veiculo,
      nome_usuario,
      visitante,
      data_inicio,
      data_fim
    } = req.query;

    console.log("\n📥 Filtros recebidos da query:", req.query);

    // Filtros no Acesso
    const filtrosAcesso = {};
    if (visitante !== undefined && visitante !== "todos") {
      filtrosAcesso.visitante = visitante === "true";
    }

    if (data_inicio && data_fim) {
      filtrosAcesso.data_hora_entrada = {
        [Op.between]: [
          new Date(`${data_inicio}T00:00:00`),
          new Date(`${data_fim}T23:59:59`)
        ]
      };
    } else if (data_inicio) {
  filtrosAcesso.data_hora_entrada = {
    [Op.between]: [
      new Date(`${data_inicio}T00:00:00`),
      new Date(`${data_inicio}T23:59:59`)
    ]
  };
}
      else if (data_fim) {
      filtrosAcesso.data_hora_entrada = {
        [Op.lte]: new Date(`${data_fim}T23:59:59`)
      };
    }

    // Filtros no Veículo
    const filtrosVeiculo = {};
    if (placa) filtrosVeiculo.placa = { [Op.like]: `%${placa}%` };
    if (tipo_veiculo) filtrosVeiculo.tipo_veiculo = tipo_veiculo;

    // Filtros no Usuário
    const filtrosUsuario = {};
    if (nome_usuario && visitante !== "true") {
      filtrosUsuario.nome = { [Op.like]: `%${nome_usuario}%` };
    }

    console.log("🔎 filtrosAcesso:", filtrosAcesso);
    console.log("🚗 filtrosVeiculo:", filtrosVeiculo);
    console.log("🧍 filtrosUsuario:", filtrosUsuario);

    // Buscar acessos com include dos veículos e usuários
   const acessos = await Acesso.findAll({
  where: filtrosAcesso,
  include: [
    {
      model: Veiculos,
      as: "veiculo",
      where: Object.keys(filtrosVeiculo).length ? filtrosVeiculo : undefined,
      required: Object.keys(filtrosVeiculo).length > 0 || Object.keys(filtrosUsuario).length > 0,
      include: [
        {
          model: Usuarios,
          as: "usuario",
          where: Object.keys(filtrosUsuario).length ? filtrosUsuario : undefined,
          required: Object.keys(filtrosUsuario).length > 0,
        }
      ],
    }
  ],
  order: [['data_hora_entrada', 'DESC']],
});



    console.log(`✅ Total acessos encontrados: ${acessos.length}`);
    res.json(acessos);
  } catch (error) {
    console.error("❌ Erro ao listar acessos:", error);
    res.status(500).json({ mensagem: "Erro ao listar acessos." });
  }
};
