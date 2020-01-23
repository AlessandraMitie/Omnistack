const express = require('express');

//roteador do express. Pegar o cara responsável (Router) pelas rota do express e separando ele dentro da variável routes
const routes = express.Router();

//passar no primeiro parâmetro a rota do usuário entre '', qual rota eu quero executar o código
//o segundo parâmetro, é uma função, no caso é uma arrow function (função escrita de forma reduzaida) que recebe 2 paramêtros. req representa a requisição (pega/recebe qualquer parâmetro que o usuário esteja enviando na requisição). res é a resposta, devolução de algo para o usuário
routes.post('/users', (req, res) => {
    return res.json(req.body);
});

//exportar as rotas deste arquivo:
module.exports = routes;