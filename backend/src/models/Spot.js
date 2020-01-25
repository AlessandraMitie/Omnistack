const mongoose = require('mongoose');

//qual será a estrutura/schema de User
const SpotSchema = new mongoose.Schema({
    //nome da imagem:
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    //usuário que criou o Spot (a informação que vai pro banco de dados)
    user: {
        //vai gravar o id do usuário:
        type: mongoose.Schema.Types.ObjectId,
        // qual model essa informação está se referindo
        ref: 'User'
    }
});

//exportar o módulo
module.exports = mongoose.model('Spot', SpotSchema);
// User é o nome do model
// UserSchema é o segundo parâmetro