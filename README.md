# 🚗 Sistema de Controle de Acesso ao Estacionamento - SENAI São José

Um sistema completo para gerenciar o controle de entrada e saída de veículos no estacionamento da unidade SENAI São José. O projeto busca otimizar o uso das vagas, aumentar a segurança, reduzir congestionamentos e garantir a conformidade com a LGPD.

## 📌 Objetivos

- Eliminar o registro manual de acessos.
- Controlar em tempo real o número de vagas disponíveis.
- Garantir segurança no acesso por meio de autenticação.
- Gerar relatórios de entrada e saída.
- Facilitar o cadastro e autorização de veículos.

---

## ⚙️ Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize (ORM)**
- **PostgreSQL**
- **JWT (Autenticação com Tokens)**
- **Dotenv**
- **Bcrypt**
- **Cors**

---

## 🧠 Estrutura do Sistema

### 👤 Usuários

- Cadastro, login e autenticação com JWT
- Perfis: **Administrador** e **Usuário Comum**
- Administradores podem listar todos os usuários e acessos

### 🚗 Veículos

- Cadastro de veículos vinculados a usuários
- Controle de autorização (permitido ou bloqueado)
- Visualização de todos os veículos (admin)

### 🅿️ Estacionamento

- Verificação de vagas disponíveis
- Atualização de ocupação de vagas em tempo real

### 🔐 Controle de Acesso

- Registro de entrada e saída de veículos
- Bloqueio automático em caso de estacionamento lotado ou veículo não autorizado

### 📈 Relatórios

- Geração de relatórios de acessos (admin)

---

## 📁 Organização das Rotas (Express)

| Rota | Método | Proteção | Descrição |
|------|--------|----------|-----------|
| `/login` | POST | Pública | Login do usuário |
| `/usuarios` | POST | Pública | Cadastro de usuário |
| `/usuarios/:id` | PUT/DELETE | Autenticado | Atualização/Remoção |
| `/usuarios` | GET | Admin | Lista todos os usuários |
| `/veiculos` | GET/POST/PUT/DELETE | Autenticado | CRUD de veículos |
| `/veiculos` | GET | Admin | Lista todos os veículos |
| `/vagas` | GET | Pública | Vagas disponíveis |
| `/acessos/entrada` | POST | Autenticado | Registrar entrada |
| `/acessos/saida/:id_acesso` | POST | Autenticado | Registrar saída |
| `/relatorios/acessos` | GET | Admin | Relatórios de acesso |

---

## 🛠️ Como rodar o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nome-do-repo.git

# Acesse a pasta do projeto
cd nome-do-repo

# Instale as dependências
npm install

# Crie um arquivo .env com as variáveis necessárias
touch .env

# Inicie o servidor
node server.js
