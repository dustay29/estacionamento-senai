// describe('Teste dummy', () => {
//   it('teste vazio', () => {
//     expect(true).toBe(true);
//   });
// });
//  Importa o Supertest, que permite fazer requisições HTTP como se fosse o frontend
import request from 'supertest';
//  Importa o app Express que você criou no server.js
import app from '../server.js';
//  Importa o modelo de usuários, veiculos
import { Usuarios } from '../models/usuario.js';
import { Veiculos } from '../models/veiculo.js';
//  Importa o bcrypt para gerar a senha criptografada
import bcrypt from 'bcrypt';

let token;
let veiculoId;

beforeAll(async () => {
  // Faça login e obtenha o token
  const res = await request(app)
    .post('/login')
    .send({ email: 'teste@teste.com', senha: '123456' }); // ajuste conforme seu usuário de teste

  token = res.body.token;
});

describe('Veículos - CRUD', () => {
  it('deve criar um veículo com sucesso', async () => {
    const res = await request(app)
      .post('/veiculos')
      .set('Authorization', token)
      .send({
        placa: 'ABC1234',
        modelo: 'Fusca',
        cor: 'Azul',
        tipo_veiculo: 'Carro'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_veiculo');
    veiculoId = res.body.id_veiculo;
  });

  it('deve atualizar o veículo', async () => {
    const res = await request(app)
      .put('/veiculos')
      .set('Authorization', token)
      .send({
        id_veiculo: veiculoId,
        modelo: 'Fusca 2.0',
        cor: 'Vermelho',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.modelo).toBe('Fusca 2.0');
    expect(res.body.cor).toBe('Vermelho');
  });

  it('deve deletar o veículo', async () => {
    const res = await request(app)
      .delete('/veiculos')
      .set('Authorization', token)
      .send({ id_veiculo: veiculoId });

    expect(res.statusCode).toBe(200);
    expect(res.body.mensagem).toMatch(/removido com sucesso/i);
  });
});
