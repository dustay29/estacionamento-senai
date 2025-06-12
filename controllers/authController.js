// criar token
import jwt from 'jsonwebtoken'
// importando o bcrypt para criptografar senhas
import bcrypt from "bcrypt";
// importando usuarios
import { Usuarios } from '../models/usuario.js'
import { Veiculos } from '../models/veiculo.js';


export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: "Email e senha são obrigatórios." });
        }

        const usuario = await Usuarios.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { id: usuario.id_usuario },
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

    const existe = await Usuarios.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuarios.create({
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

export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, telefone, email, tipo_usuario, senha } = req.body;

    // Verifica se o usuário existe
    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    // Verifica se o novo email já está sendo usado por outro usuário
    if (email && email !== usuario.email) {
      const emailExiste = await Usuarios.findOne({ where: { email } });
      if (emailExiste) {
        return res.status(400).json({ erro: "E-mail já está em uso." });
      }
    }

    // Atualiza os campos (apenas se enviados)
    if (nome) usuario.nome = nome;
    if (cpf) usuario.cpf = cpf;
    if (telefone) usuario.telefone = telefone;
    if (email) usuario.email = email;
    if (tipo_usuario) usuario.tipo_usuario = tipo_usuario;

    // Se a senha for enviada, criptografa antes de atualizar
    if (senha) {
      const senhaHash = await bcrypt.hash(senha, 10);
      usuario.senha = senhaHash;
    }

    await usuario.save();

    res.json({ mensagem: "Usuário atualizado com sucesso!", usuario });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao atualizar usuário." });
  }
};

// Função para remover um usuário do banco de dados
export const removerUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuarios.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    // Remove todos os veículos associados ao usuário
    await Veiculos.destroy({ where: { id_usuario: id } });

    // Agora sim, remove o usuário
    await usuario.destroy();

    res.json({ mensagem: "Usuário removido com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao remover usuário." });
  }
}
export const listarTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll();
    res.json(usuarios);
  } catch (erro) {
    console.error("Erro ao listar usuários:", erro);
    res.status(500).json({ mensagem: "Erro no servidor ao listar usuários." });
  }
};
