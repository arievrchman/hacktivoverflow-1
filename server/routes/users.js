const routes = require('express').Router();
const { register, login, isLogin } = require('../controllers/user');
const authenticate = require('../middlewares/authenticate');

routes.post('/register', register);
routes.post('/login', login);
routes.get('/auth', authenticate, isLogin);

module.exports = routes;
