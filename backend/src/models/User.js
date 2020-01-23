const mongoose = require('mongoose');

//qual será a estrutura/schema de User
const UserSchema = new mongoose.Schema({
    email: String,
});

//exportar o módulo
module.exports = mongoose.model('User', UserSchema);
// User é o nome do model
// UserSchema é o segundo parâmetro