//importar express:
const express = require('express');
//require vai importar uma dependência externa, no caso é o express
//importar rotas:
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);
//passa a porta que quero executar minha aplicação