const mongoose = require('mongoose');

//qual será a estrutura/schema de User
const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean, //usuário que criou o Spot (a informação que vai pro banco de dados)
    user: {
        //vai gravar o id do usuário:
        type: mongoose.Schema.Types.ObjectId,
        // qual model essa informação está se referindo
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});

//exportar o módulo
module.exports = mongoose.model('Booking', BookingSchema);
// User é o nome do model
// UserSchema é o segundo parâmetro