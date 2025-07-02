import app from './server.js'

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})

// Para rodar o servidor, use o comando: node index.js
// Para rodar os testes, use o comando: npm test