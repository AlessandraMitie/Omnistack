//importar express:
const express = require('express');
//require vai importar uma dependência externa, no caso é o express
//importar mongoose:
const mongoose = require('mongoose');
//importar cors:
const cors = require('cors');
//importar path, que vai lidar com os caminhos dentro da aplicação:
const path = require('path');

//importar socket io
const socketio = require('socket.io');
//importar http
const http = require('http');

//importar rotas:
const routes = require('./routes');

const app = express();
const server = http.Server(app); //está pegando o servidor http e está extraindo ele de dentro do express
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-dzylq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {};

//vai ouvir a informação de todo usuário que se logar na aplicação e o socket representa a conexão com o usuário
//toda vez que o usuário logar, vou anotar a informação em algum lugar
io.on('connection', socket => {
    //console.log(socket.handshake.query);
    //console.log('Usuário conectado', socket.id);

    //setTimeout(() => {
        //socket.emit('message', 'world');
        //no lugar de message poderia ser qualquer coisa
        //world é o conteúdo que vai ser enviado
    //}, 4000);
    
    //ouvir uma mensagem, no servidor:
    //socket.on('omni', data => {
        //console.log(data);
    //})

    //toda vez que o usuário conectar na aplicação, vai buscar o id dentro de socket.handshake.query
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    //next é uma função que quando for chamada, quer dizer que quer continuar o fluxo normal da aplicação
    req.io = io;
    //deixar disponível para todas as rotas, os usuários conectados na aplicação
    req.connectedUsers = connectedUsers;

    return next();
});
app.use(cors());
//deixar cors vazio signfica que qualquer aplicação pode acessar a api
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
//dirname vai retornar o diretorio que meu arquivo server.js está
app.use(routes);

server.listen(3333);
//passa a porta que quero executar minha aplicação