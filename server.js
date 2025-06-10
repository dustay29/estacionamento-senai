import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import acessoRoutes from './routes/acessoRoutes.js' // ✅
const app = express()

app.use(cors())
app.use(express.json())

// Conectar as rotas
app.use("/acesso", acessoRoutes) // ✅

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})
