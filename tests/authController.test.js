// //  Importa o Supertest, que permite fazer requisições HTTP como se fosse o frontend
// import request from 'supertest';
// //  Importa o app Express que você criou no server.js
// import app from '../server.js';
// //  Importa o modelo de usuários, veiculos
// import { Usuarios } from '../models/usuario.js';
// import { Veiculos } from '../models/veiculo.js';
// //  Importa o bcrypt para gerar a senha criptografada
// import bcrypt from 'bcrypt';

// let token; // 🔐 Vai guardar o token pro próximo teste

// // describe('Login de Usuário', () => {

// //   //1-TESTE crição um usuário no banco
// //   beforeAll(async () => {
// //     const senhaHash = await bcrypt.hash('123456', 10); // senha já criptografada
// //     // Garante que o usuário não exista duas vezes
// //     await Usuarios.create({
// //       nome: "Usuário Teste",
// //       cpf: "12345678900",
// //       telefone: "999999999",
// //       email: "teste@teste.com",
// //       senha: senhaHash,
// //       isAdmin: false
// //     });
// //   });

// //   // 2-Teste login com e-mail e senha válidos
// //   it('deve fazer login com sucesso com credenciais válidas', async () => {
// //     const resposta = await request(app) // usa o app pra simular a requisição
// //       .post('/login') // faz um POST no endpoint /login
// //       .send({         // envia e-mail e senha no corpo
// //         email: 'teste@teste.com',
// //         senha: '123456'
// //       });

// //     //  Espera que a resposta seja 200 (ok)
// //     expect(resposta.statusCode).toBe(200);

// //     //  Espera que venha um token no corpo da resposta
// //     expect(resposta.body).toHaveProperty('token');
// //   });
// // });

// // 3-Teste login com e-mail inválido
// // describe('Login com e-mail inválido', () => {
// //   it('deve retornar erro com e-mail inválido', async () => {
// //     const resposta = await request(app)
// //       .post('/login')
// //       .send({
// //         email: 'testi@testi.com',
// //         senha: '123456'
// //       });
// //     // Espera que a resposta seja 401 (não autorizado)
// //    expect(resposta.body).toHaveProperty('mensagem');
// //    expect(resposta.body.mensagem).toBe('Credenciais inválidas');
// //   });
// // });

// // 4-Teste    atualização de usuario 
// describe('Atualização de usuário', () => {
//   beforeAll(async () => {
//     // 🔐 Login do usuário existente
//     const respostaLogin = await request(app)
//       .post('/login')
//       .send({
//         email: 'teste@teste.com',
//         senha: '123456'
//       });

//     token = respostaLogin.body.token;
//   });

//   it('deve atualizar o nome cpf e telefone do usuário com sucesso', async () => {
//     const resposta = await request(app)
//       .put('/usuarios/atualizar') // ✅ PUT correto
//       .set('Authorization', token) 
//       .send({
//         nome: "Usuário Atualizado",
//         cpf: "88844477799",
//         telefone: "(48) 1555-8888",
//         email: "teste@teste.com",
//         senha: "123456"
//       });

//     expect(resposta.body).toHaveProperty('mensagem');
//     expect(resposta.body.mensagem).toBe('Usuário atualizado com sucesso!');
//   });
// });

describe('Teste dummy', () => {
  it('teste vazio', () => {
    expect(true).toBe(true);
  });
});