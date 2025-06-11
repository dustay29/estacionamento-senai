import { Veiculos } from '../models/veiculo.js'

export const listarVeiculos = async (req, res) => {
    const veiculos = await Veiculos.findAll({ where: { usuario_id: req.usuarioId } })
    res.json(veiculos)
}
//////////////////////////////////////////////////////////
export const criarVeiculo = async (req, res) => {
  try {
    const { placa, modelo, cor, tipo_veiculo } = req.body

    const novoVeiculo = await Veiculos.create({
      placa,
      modelo,
      cor,
      tipo_veiculo,
      id_usuario: req.usuarioId // nome correto do campo
    })

    res.status(201).json(novoVeiculo)
  } catch (erro) {
    console.error("Erro ao criar veículo:", erro)
    res.status(500).json({ mensagem: "Erro ao criar veículo" })
  }
}

export const atualizarVeiculo = async (req, res) => {
    const { id } = req.params
    const veiculos = await Veiculos.findOne({ where: { id, usuario_id: req.usuarioId } })
    if (!veiculos) return res.status(404).json({ mensagem: 'Veiculo não encontrado' })

    await Veiculos.update(req.body)
    res.json(veiculos)
}

export const removerVeiculo = async (req, res) => {
    const { id } = req.params
    const veiculos = await Veiculos.findOne({ where: { id, usuario_id: req.usuarioId } })
    if (!veiculos) return res.status(404).json({ mensagem: 'Veiculo não encontrado' })

    await Veiculos.destroy()
    res.status(204).send()
}