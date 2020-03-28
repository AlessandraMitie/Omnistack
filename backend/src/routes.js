const express = require('express');
//importar multer:
const multer = require('multer');
const uploadConfig = require('./config/upload');

//importar controller
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

//roteador do express. Pegar o cara responsável (Router) pelas rota do express e separando ele dentro da variável routes
const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
//passar no primeiro parâmetro a rota do usuário entre '', qual rota eu quero executar o código
//o segundo parâmetro, é uma função, no caso é uma arrow function (função escrita de forma reduzaida) que recebe 2 paramêtros. req representa a requisição (pega/recebe qualquer parâmetro que o usuário esteja enviando na requisição). res é a resposta, devolução de algo para o usuário
//store é o método criado em SessionController

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
//single porque é uma única imagem. Se fosse mais, poderia usar array
//thumbnail é o nome do campo que terá a imagem
routes.get('/dashboard', DashboardController.show);

//rota encadeada
//o usuário quer criar uma reserva dentro do spot com tal id
routes.post('/spots/:spot_id/bookings', BookingController.store);

//qual a solicitação de reserva que vai aceitar ou rejeitar
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

//exportar as rotas deste arquivo:
module.exports = routes;