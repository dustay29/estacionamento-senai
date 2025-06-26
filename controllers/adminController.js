import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { Usuarios } from '../models/usuario.js';
import { Veiculos } from '../models/veiculo.js';

// Admin atualiza os dados de qualquer usuário
export const adminAtualizarUsuario = async (req, res) => {
  try {
    const { id_usuario, nome, cpf, telefone, email, senha, isAdmin } = req.body;
    console.log("Dados recebidos para atualização:", req.body);
    const usuario = await Usuarios.findByPk(id_usuario);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    if (email && email !== usuario.email) {
      const emailExiste = await Usuarios.findOne({ where: { email } });
      if (emailExiste) {
        return res.status(400).json({ erro: "E-mail já está em uso." });
      }
    }

    // Atualiza os campos, se enviados
    if (nome) usuario.nome = nome;
    if (cpf) usuario.cpf = cpf;
    if (telefone) usuario.telefone = telefone;
    if (email) usuario.email = email;
    if (typeof isAdmin === "boolean") usuario.isAdmin = isAdmin;

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

// Admin remove qualquer usuário pelo ID
export const adminRemoverUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.body;

    const usuario = await Usuarios.findByPk(id_usuario);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    await usuario.destroy();

    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao deletar usuário." });
  }
};

// Admin lista todos os usuários
export const listarTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll();
    res.json(usuarios);
  } catch (erro) {
    console.error("Erro ao listar usuários:", erro);
    res.status(500).json({ mensagem: "Erro no servidor ao listar usuários." });
  }
};

// Admin lista todos os veículos
export const listarTodosVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculos.findAll();
    res.json(veiculos);
  } catch (erro) {
    console.error("Erro ao listar veículos:", erro);
    res.status(500).json({ mensagem: "Erro no servidor ao listar veículos." });
  }
};

// Admin atualiza qualquer veículo
export const adminAtualizarVeiculo = async (req, res) => {
  const { id_veiculo, placa, modelo, cor, tipo_veiculo, id_usuario } = req.body;

  try {
    if (!id_veiculo) {
      return res.status(400).json({ mensagem: "ID do veículo é obrigatório." });
    }

    const veiculo = await Veiculos.findByPk(id_veiculo);
    if (!veiculo) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
    }

    if (placa) veiculo.placa = placa;
    if (modelo) veiculo.modelo = modelo;
    if (cor) veiculo.cor = cor;
    if (tipo_veiculo) veiculo.tipo_veiculo = tipo_veiculo;
    if (id_usuario) veiculo.id_usuario = id_usuario;

    await veiculo.save();

    res.json({ mensagem: "Veículo atualizado com sucesso!", veiculo });
  } catch (erro) {
    console.error("Erro ao atualizar veículo (admin):", erro);
    res.status(500).json({ mensagem: "Erro ao atualizar veículo." });
  }
};

// Admin remove qualquer veículo
export const adminRemoverVeiculo = async (req, res) => {
  const { id_veiculo } = req.body;

  if (!id_veiculo) {
    return res.status(400).json({ mensagem: 'ID do veículo é obrigatório.' });
  }

  try {
    const veiculo = await Veiculos.findByPk(id_veiculo);

    if (!veiculo) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
    }

    await veiculo.destroy();

    res.json({ mensagem: 'Veículo removido com sucesso.' });
  } catch (erro) {
    console.error("Erro ao remover veículo (admin):", erro);
    res.status(500).json({ mensagem: 'Erro ao remover veículo.' });
  }
};
