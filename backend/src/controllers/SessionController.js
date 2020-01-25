// importar o model de usuário:
const User = require('../models/user');

// só pode exportar um objeto, ter apenas um método. Caso queria outro método, criar outro arquivo
// dentro do controller temos os seguintes métodos:
// index (esse método retorna uma listagem de sessoes), show (retorna uma sessão), store (criar uma sessão), update, destroy

module.exports = {
    //função store é assíncrona pois pode demorar um tempo para executar
    async store(req, res) {
        //const email = req.body.email pode ser escrito assim:
        const { email } = req.body;

        let user = await User.findOne({ email });
        //método find busca pelo id
        //One, porque só tem o email de parâmetro

        if (!user) {
        // se ele não encontrar o usuário:
            user = await User.create({ email });
            // await é usado para funções assíncronas pq só vai deixar o programa prosseguir para a próxima linha, quando essa instrução finalizar (terminar o cadastro no banco)
            // email é o objeto com a informmaçao que vai ser usada para criar o usuário
        }

        return res.json(user);
        //retornar uma resposta em formato de json com o usuário 
    }
};