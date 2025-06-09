import jwt from 'jsonwebtoken'

export const autenticar = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' })

    try {
        const decoded = jwt.verify(token, process.env.SEGREDO_JWT)
        req.usuarioId = decoded.id
        next()
    }catch (erro) {
            console.error("Erro ao verificar token:", erro);
            res.status(401).json({ mensagem: 'Token inválido' });
        }
        
    console.log("Token recebido:", token);
console.log("Segredo JWT:", process.env.SEGREDO_JWT);

}