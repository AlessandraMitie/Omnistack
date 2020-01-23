//importar express:
const express = require('express');
//require vai importar uma dependência externa, no caso é o express
//importar mongoose:
const mongoose = require('mongoose');
//importar rotas:
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-dzylq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.json());
app.use(routes);

app.listen(3333);
//passa a porta que quero executar minha aplicação