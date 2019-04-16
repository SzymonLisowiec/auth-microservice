const Controller = require('./Controller');
const Passport = require('passport');
const Config = require('../config');

class LoginController extends Controller {

  async login(request, response) {

    const input = request.method === 'GET' ? request.query : request.body;
    
    this.validate(input, {
      strategy: `required|string|in:${Config.strategies.join(',')}`,
      returnTo: 'string',
    });
    
    this.authenticate(input.strategy, request, response, input).then(async (result) => {

      if (request.user) {

        response.json({}); // Account assignation successful

      } else {

        const token = await result.user.getToken(input.tokenEngine);
        delete result.user;

        response.json({
          ...token,
          ...result,
        });

      }

    }).catch((error) => {
      if (!error.isAuthenticationError) throw error;
      console.dir(error);
      response.status(401).json({
        error: error.message,
      });
    });

  }

  authenticate(strategy, request, response, input) {
    return new Promise((resolve, reject) => {

      const options = {
        session: false,
      };
      if (input.returnTo) options.callbackURL = input.returnTo;

      Passport.authenticate(strategy, options, (error, user) => {
        
        if (error) {
          error.isAuthenticationError = true;
          reject(error);
          return;
        }
        
        resolve(user);
        
      })(request, response);
    });
  }

}

module.exports = LoginController;
