import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { Veiculos } from "../models/veiculo.js";
import { Usuarios } from "../models/usuario.js";


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
      { id: usuario.id_usuario, isAdmin: usuario.isAdmin },
      process.env.SEGREDO_JWT,
      { expiresIn: '1h' }
    );

    res.json({
      mensagem: "Login realizado com sucesso!",
      token
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro no login." });
  }
};

export const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, cpf, telefone, email, senha } = req.body;

    if (!nome || !cpf || !telefone || !email || !senha) {
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
      senha: senhaHash,
      isAdmin: false, // sempre usuário comum
    });

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: {
        id: novoUsuario.id_usuario,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        isAdmin: novoUsuario.isAdmin
      }
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao cadastrar usuário." });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const id = req.usuarioId;
    const { nome, cpf, telefone, email, senha } = req.body;

    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    if (email && email !== usuario.email) {
      const emailExiste = await Usuarios.findOne({ where: { email } });
      if (emailExiste) {
        return res.status(400).json({ erro: "E-mail já está em uso." });
      }
    }

    // Atualiza os campos (se enviados)
    if (nome) usuario.nome = nome;
    if (cpf) usuario.cpf = cpf;
    if (telefone) usuario.telefone = telefone;
    if (email) usuario.email = email;

    if (senha) {
      const senhaHash = await bcrypt.hash(senha, 10);
      usuario.senha = senhaHash;
    }

    // ❗ Nunca permitir mudar isAdmin por aqui

    await usuario.save();

    res.json({ mensagem: "Usuário atualizado com sucesso!", usuario });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao atualizar usuário." });
  }
};

export const removerUsuario = async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.usuarioId);
    const id = req.usuarioId;

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    await Veiculos.destroy({ where: { id_usuario: id } });
    await usuario.destroy();

    res.json({ mensagem: "Usuário removido com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao remover usuário." });
  }
};

export const buscarUsuarioLogado = async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.usuarioId);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    res.json({
      id: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      telefone: usuario.telefone,
      isAdmin: usuario.isAdmin
    });

  } catch (erro) {
    console.error("Erro ao buscar usuário logado:", erro);
    res.status(500).json({ erro: "Erro ao buscar usuário logado." });
  }
};
