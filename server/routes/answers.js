const routes = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const { create, findAllAnswer } = require('../controllers/answer');

routes.get('/', findAllAnswer);

routes.use(authenticate);
routes.post('/', create);

module.exports = routes;