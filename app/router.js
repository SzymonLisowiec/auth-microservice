const { Router } = require('express');
const Log = require('./Log');
const ErrorHandler = require('./ErrorHandler');

const router = new Router();

const AuthorizationMiddleware = require('./middleware/AuthorizationMiddleware');

const RegisterController = require('./controllers/RegisterController');
const LoginController = require('./controllers/LoginController');
const LookupController = require('./controllers/LookupController');
const UserController = require('./controllers/UserController');
const SecurityController = require('./controllers/SecurityController');

function controller(controller, method) {
  return async (...args) => {
    Log.debug('WebService', `${args[0].method} ${args[0].route.path}`);
    try {
      await (new controller())[method](...args);
    } catch(error) {
      ErrorHandler(error, ...args);
    }
  };
}

router.post('/register', AuthorizationMiddleware(false), controller(RegisterController, 'register'));
router.post('/login', controller(LoginController, 'login'));
router.get('/login', controller(LoginController, 'login'));
router.get('/assign', AuthorizationMiddleware(false), controller(LoginController, 'login'));
router.get('/lookup/:search', controller(LookupController, 'lookup'));
router.get('/user', AuthorizationMiddleware(true), controller(UserController, 'user'));

router.get('/security', controller(SecurityController, 'security'));
router.get('/security.txt', controller(SecurityController, 'security'));
router.get('/.well-known/security', controller(SecurityController, 'security'));
router.get('/.well-known/security.txt', controller(SecurityController, 'security'));

module.exports = router;
