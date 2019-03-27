const routes = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const { create, findAll, findOne, update, deleteQuestion, upVotes, downVotes } = require('../controllers/question');

routes.get('/', findAll);
routes.get('/:id', findOne);

routes.use(authenticate);
routes.post('/', create);
routes.patch('/:id', update);
routes.patch('/:id/upvotes', upVotes);
routes.patch('/:id/downvotes', downVotes);
routes.delete('/:id', deleteQuestion);

module.exports = routes;