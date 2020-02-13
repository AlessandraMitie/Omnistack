//importar User
const User = require('../models/User');
//importar Spot
const Spot = require('../models/Spot');

module.exports = {
    async index(req, res) {
    //index vai retornar uma listagem de recursos, no caso uma lista de spot
        const { tech } = req.query;
        //buscar spots somente dessa tecnologia
        const spots = await Spot.find({ techs: tech });
        //techs é o campo dentro da model Spot

        return res.json(spots);
    },

    //criar um novo Spot:
    async store(req, res) {
        //console.log(req.body);
        //console.log(req.file);

        //criação:
        //importar filename de dentro de req.file
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        //validar se o usuário existe
        const user = await User.findById(user_id);

        //se o usuário nao existe, retornar um erro:
        if (!user) {
            return res.status(400).json({ error: 'User does not exists' });
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            //transformar techs em array:
            techs: techs.split(',').map(tech => tech.trim()),
            //split vai cortar a string em vários pedaços separados por vírgula
            //map vai percorrer o array. Para cada uma das tecnologias, vai realizar um tech.trim. O trim vai tirar o espaço antes e depois de uma string
            price
        })

        return res.json(spot)
    }
};