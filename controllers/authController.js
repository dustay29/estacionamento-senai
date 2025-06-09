import jwt from 'jsonwebtoken'
import { Usuario } from '../models/usuario.js'

export const login = async (req, res) => {
    const { email, senha } = req.body
    const usuario = await Usuario.findOne({ where: { email } })

    if (!usuario || usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas' })
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SEGREDO_JWT, { expiresIn: '1h' })
    res.json({ token })
}

export const cadastrarUsuario = async (req, res) => {
    const { nome, cpf, telefone, email, senha } = req.body
    const existe = await Usuario.findOne({ where: { email } })
    if (existe) return res.status(400).json({ mensagem: 'Usuário já existe' })

    const novo = await Usuario.create({ nome, cpf, telefone, email, senha })
    res.status(201).json(novo)
}