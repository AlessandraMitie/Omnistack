const mongoose = require('mongoose');

//qual será a estrutura/schema de Spot
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
}, {
    toJSON: {
        virtuals: true,
        //toda vez que um spoto for convertido em json, recalcular os virtuals automaticamente
    }
});

SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://localhost:3333/files/${this.thumbnail}`
})
//exportar o módulo
module.exports = mongoose.model('Spot', SpotSchema);
// Spot é o nome do model
// SpotSchema é o segundo parâmetro