const express = require('express');

const usuarioController = require('./controllers/usuarioController');
const produtoController = require('./controllers/produtoController');
const profileController = require('./controllers/profileController');

const routes = express.Router();

routes.get('/logon', usuarioController.login);
routes.get('/usuario', usuarioController.index);
routes.post('/usuario', usuarioController.create);

routes.post('/produto', produtoController.create);
routes.get('/produto', produtoController.index);
routes.delete('/produto/:id', produtoController.delete);

routes.get('/pesquisa', profileController.index);

module.exports = routes;

