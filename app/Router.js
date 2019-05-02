const { Router: ExpressRouter } = require('express');
const Log = require('./Log');
const ErrorHandler = require('./ErrorHandler');

const AuthorizationMiddleware = require('./middleware/AuthorizationMiddleware');
const InternalAuthorizationMiddleware = require('./middleware/InternalAuthorizationMiddleware');

const RegisterController = require('./controllers/RegisterController');
const LoginController = require('./controllers/LoginController');
const LookupController = require('./controllers/LookupController');
const UserController = require('./controllers/UserController');
const SecurityController = require('./controllers/SecurityController');
const ConfirmationsController = require('./controllers/ConfirmationsController');


class Router {

  constructor(app, ...args) {
    this.app = app;
    this.router = new ExpressRouter(...args);
    this.routing();
  }

  controller(controller, method) {
    return async (...args) => {
      Log.debug('WebService', `${args[0].method} ${args[0].route.path}`);
      try {
        await (new controller(this.app))[method](...args);
      } catch(error) {
        ErrorHandler(error, ...args);
      }
    };
  }
  
  routing() {

    const controller = this.controller.bind(this);

    this.router.post('/register', AuthorizationMiddleware(false), controller(RegisterController, 'register'));
    this.router.post('/login', controller(LoginController, 'login'));
    this.router.get('/login', controller(LoginController, 'login'));
    this.router.get('/assign', AuthorizationMiddleware(false), controller(LoginController, 'login'));
    this.router.get('/lookup/:search', controller(LookupController, 'lookup'));
    this.router.get('/user', AuthorizationMiddleware(true), controller(UserController, 'user'));

    this.router.post('/confirmations/new', InternalAuthorizationMiddleware(true), controller(ConfirmationsController, 'new'));
    this.router.get('/confirmations/confirm/:token', controller(ConfirmationsController, 'confirm'));
    this.router.get('/confirmations/refresh/:type', AuthorizationMiddleware(true), controller(ConfirmationsController, 'refresh'));
    this.router.get('/confirmations/isConfirmed/:type', AuthorizationMiddleware(true), controller(ConfirmationsController, 'isConfirmed'));

    this.router.get('/security', controller(SecurityController, 'security'));
    this.router.get('/security.txt', controller(SecurityController, 'security'));
    this.router.get('/.well-known/security', controller(SecurityController, 'security'));
    this.router.get('/.well-known/security.txt', controller(SecurityController, 'security'));
  }

}

module.exports = Router;
