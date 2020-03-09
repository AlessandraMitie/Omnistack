//importar express:
const express = require('express');
//require vai importar uma dependência externa, no caso é o express
//importar mongoose:
const mongoose = require('mongoose');
//importar cors:
const cors = require('cors');
//importar path, que vai lidar com os caminhos dentro da aplicação:
const path = require('path');

//importar rotas:
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-dzylq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());
//deixar cors vazio signfica que qualquer aplicação pode acessar a api
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
//dirname vai retornar o diretorio que meu arquivo server.js está
app.use(routes);

app.listen(3333);
//passa a porta que quero executar minha aplicação