//mportar Spot
const Spot = require('../models/Spot');

module.exports = {
    //criar um novo Spot:
    async store(req, res) {
        //console.log(req.body);
        //console.log(req.file);

        //criação:
        //importar filename de dentro de req.file
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        return res.json({ ok: true})
    }
};