const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        //buscar o usuário logado que está fazendo a reserva de dentro do cabeçalho
        const { user_id } = req.headers;
        const { spot_id } = req.params; //parâmetros dentro da rota
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        //popular o relacionamento de spot e popular o relacionamento de usuário
        await booking.populate('spot').populate('user').execPopulate();
        //execPopulate-> executar os populates e preencher os dados de spot e usuário

        //buscar uma conexão em tempo real
        const ownerSocket = req.connectedUsers[booking.spot.user];

        //se existir uma conexão em tempo real, vai enviar uma msg pra ele (to):
        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};