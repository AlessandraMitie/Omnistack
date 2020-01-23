// só pode exportar um objeto, ter apenas um método. Caso queria outro método, criar outro arquivo
// dentro do controller temos os seguintes métodos:
// index (esse método retorna uma listagem de sessoes), show (retorna uma sessão), store (criar uma sessão), update, destroy

module.exports = {
    store(req, res) {
        return res.json({ message: 'Hello World'})
    }
};