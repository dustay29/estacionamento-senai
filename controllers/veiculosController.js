import { Veiculos } from '../models/veiculo.js';
import { Usuarios } from '../models/usuario.js';
import { Vagas } from '../models/vagas.js';

export const listarVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculos.findAll({ where: { id_usuario: req.usuarioId } });
    res.json(veiculos);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao listar veículos" });
  }
};

export const cadastrarVeiculo = async (req, res) => {
  try {
    const { placa, modelo, cor, tipo_veiculo, id_vaga } = req.body;

    if (!id_vaga) {
      return res.status(400).json({ mensagem: "A vaga é obrigatória." });
    }

    const veiculoExistente = await Veiculos.findOne({ where: { placa } });
    if (veiculoExistente) {
      return res.status(400).json({ mensagem: "Já existe um veículo com essa placa." });
    }

    const vaga = await Vagas.findByPk(id_vaga);
    if (!vaga) {
      return res.status(404).json({ mensagem: "Vaga não encontrada." });
    }

    if (vaga.vagas_ocupadas >= vaga.total_vagas) {
      return res.status(400).json({ mensagem: "Essa vaga está cheia." });
    }

    const novoVeiculo = await Veiculos.create({
      placa,
      modelo,
      cor,
      tipo_veiculo,
      id_usuario: req.usuarioId,
      id_vaga
    });

    // Incrementar a vaga ocupada
    await Vagas.update(
      { vagas_ocupadas: vaga.vagas_ocupadas + 1 },
      { where: { id_vaga } }
    );

    res.status(201).json(novoVeiculo);
  } catch (erro) {
    console.error("Erro ao criar veículo:", erro);
    res.status(500).json({ mensagem: "Erro ao criar veículo" });
  }
};

export const atualizarVeiculo = async (req, res) => {
  const { id_veiculo } = req.body;

  try {
    if (!id_veiculo) {
      return res.status(400).json({ mensagem: "ID do veículo é obrigatório." });
    }

    const veiculo = await Veiculos.findOne({
      where: { id_veiculo, id_usuario: req.usuarioId }
    });

    if (!veiculo) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado' });
    }

    // OBS: Aqui NÃO deixamos mudar o id_vaga por segurança
    const { id_vaga, ...dadosParaAtualizar } = req.body;

    const [_, [veiculoAtualizado]] = await Veiculos.update(dadosParaAtualizar, {
      where: { id_veiculo, id_usuario: req.usuarioId },
      returning: true
    });

    res.json(veiculoAtualizado);
  } catch (erro) {
    console.error("Erro ao atualizar veículo:", erro);
    res.status(500).json({ mensagem: "Erro ao atualizar veículo" });
  }
};

export const removerVeiculo = async (req, res) => {
  const { id_veiculo } = req.body;

  if (!id_veiculo) {
    return res.status(400).json({ mensagem: 'ID do veículo é obrigatório.' });
  }

  try {
    const veiculo = await Veiculos.findOne({
      where: { id_veiculo, id_usuario: req.usuarioId }
    });

    if (!veiculo) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
    }

    const vaga = await Vagas.findByPk(veiculo.id_vaga);
    if (vaga) {
      await Vagas.update(
        { vagas_ocupadas: Math.max(vaga.vagas_ocupadas - 1, 0) },
        { where: { id_vaga: vaga.id_vaga } }
      );
    }

    await Veiculos.destroy({
      where: { id_veiculo, id_usuario: req.usuarioId }
    });

    res.status(200).json({ mensagem: 'Veículo removido com sucesso.' });
  } catch (erro) {
    console.error("Erro ao remover veículo:", erro);
    res.status(500).json({ mensagem: 'Erro ao remover veículo.' });
  }
};
