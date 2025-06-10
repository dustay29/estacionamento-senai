// criar token
import jwt from 'jsonwebtoken'
// importando o bcrypt para criptografar senhas
import bcrypt from "bcrypt";
// importando usuarios
import { Usuarios } from '../models/usuario.js'


export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: "Email e senha são obrigatórios." });
        }

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { id: usuario.id },
            process.env.SEGREDO_JWT,
            { expiresIn: '1h' }
        );

        res.json({ mensagem: "Login realizado com sucesso!", token });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro no login." });
    }
};


export const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, cpf, telefone, email, tipo_usuario, senha } = req.body;

    if (!nome || !cpf || !telefone || !email || !tipo_usuario || !senha) {
      return res.status(400).json({ erro: "Dados incompletos." });
    }

    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      cpf,
      telefone,
      email,
      tipo_usuario,
      senha: senhaHash,
    });

    res.status(201).json(novoUsuario);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao cadastrar usuário." });
  }
};
