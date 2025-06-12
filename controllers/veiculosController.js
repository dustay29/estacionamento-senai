import { Veiculos } from '../models/veiculo.js'

export const listarVeiculos = async (req, res) => {
    const veiculos = await Veiculos.findAll({ where: { id_usuario: req.usuarioId } })
    res.json(veiculos)
}
// post cadastrar veiculo
export const cadastrarVeiculo = async (req, res) => {
  try {
    const { placa, modelo, cor, tipo_veiculo } = req.body;

    // Verifica se já existe um veículo com essa placa
    const veiculoExistente = await Veiculos.findOne({ where: { placa } });

    if (veiculoExistente) {
      return res.status(400).json({
        mensagem: "Já existe um veículo cadastrado com essa placa."
      });
    }

    const novoVeiculo = await Veiculos.create({
      placa,
      modelo,
      cor,
      tipo_veiculo,
      id_usuario: req.usuarioId 
    });

    res.status(201).json(novoVeiculo);
  } catch (erro) {
    console.error("Erro ao criar veículo:", erro);
    res.status(500).json({ mensagem: "Erro ao criar veículo" });
  }
};


export const atualizarVeiculo = async (req, res) => {
  const id_veiculo = req.params.id;


  try {
    const veiculo = await Veiculos.findOne({ where: {id_veiculo, id_usuario: req.usuarioId } });
    if (!veiculo) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado' });
    }

    await Veiculos.update(req.body, { where: { id_veiculo, id_usuario: req.usuarioId } });

    const veiculoAtualizado = await Veiculos.findOne({ where: { id_veiculo, id_usuario: req.usuarioId } });

    res.json(veiculoAtualizado);
  } catch (erro) {
    console.error("Erro ao atualizar veículo:", erro);
    res.status(500).json({ mensagem: "Erro ao atualizar veículo" });
  }
};


export const removerVeiculo = async (req, res) => {
  // buscando id do veiculo a ser excluido
  const id_veiculo = req.params.id;

  try {
    const veiculo = await Veiculos.findOne({ where: { id_veiculo, id_usuario: req.usuarioId } });
    if (!veiculo) return res.status(404).json({ mensagem: 'Veículo não encontrado' });

    await Veiculos.destroy({ where: { id_veiculo, id_usuario: req.usuarioId } });

    res.status(200).json({ mensagem: 'Veículo deletado com sucesso' });
  } catch (erro) {
    console.error("Erro ao remover veículo:", erro);
    res.status(500).json({ mensagem: "Erro ao remover veículo" });
  }
}
export const listarTodosVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculos.findAll();
    res.json(veiculos);
  } catch (erro) {
    console.error("Erro ao listar veículos:", erro);
    res.status(500).json({ mensagem: "Erro no servidor ao listar veículos." });
  }
};
