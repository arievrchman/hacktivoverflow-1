const routes = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const { create, update, deleteAnswer, upvotes, downvotes } = require('../controllers/answer');

routes.use(authenticate);
routes.post('/', create);
routes.patch('/:id', update);
routes.patch('/:id/upvotes', upvotes);
routes.patch('/:id/downvotes', downvotes);
routes.delete('/:id', deleteAnswer);

module.exports = routes;