const Booking = require('../models/Booking');

module.exports = {
    async StorageEvent(req, res) {
        //buscar o usuário logado que está fazendo a reserva de dentro do cabeçalho
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });
        return res.json(booking);
    }
};