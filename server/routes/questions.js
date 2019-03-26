const routes = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const { create, findAll, findOne } = require('../controllers/question');

routes.get('/', findAll);
routes.get('/:id', findOne);

routes.use(authenticate);
routes.post('/', create);

module.exports = routes;