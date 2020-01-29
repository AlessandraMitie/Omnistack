const Spot = require('../models/Spot');

//exportar método show
module.exports = {
    async show(req, res) {
        //buscar id do usuário logado:
        const { user_id } = req.headers;
        //buscar todos os spots que o campo user dentro do banco de dados é igual ao user_id que está vindo nesse cabeçalho
        const spots = await Spot.find({ user: user_id});

        return res.json(spots);
    }
}