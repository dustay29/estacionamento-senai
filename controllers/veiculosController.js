import { Veiculo } from '../models/Veiculos.js'

export const listarVeiculos = async (req, res) => {
    const veiculos = await Veiculo.findAll({ where: { usuario_id: req.usuarioId } })
    res.json(veiculos)
}

export const criarVeiculo = async (req, res) => {
    const { placa, modelo, cor, tipo_veiculo } = req.body
    const novoVeiculo = await Veiculo.create({ placa, modelo, cor, tipo_veiculo, usuario_id: req.usuarioId })
    res.status(201).json(novoVeiculo)
}

export const atualizarVeiculo = async (req, res) => {
    const { id } = req.params
    const veiculos = await Veiculo.findOne({ where: { id, usuario_id: req.usuarioId } })
    if (!veiculos) return res.status(404).json({ mensagem: 'Veiculo não encontrado' })

    await veiculos.update(req.body)
    res.json(veiculos)
}

export const removerVeiculo = async (req, res) => {
    const { id } = req.params
    const veiculos = await Veiculo.findOne({ where: { id, usuario_id: req.usuarioId } })
    if (!veiculos) return res.status(404).json({ mensagem: 'Veiculo não encontrado' })

    await veiculos.destroy()
    res.status(204).send()
}