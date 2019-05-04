const Controller = require('./Controller');
const Config = require('../config');
const User = require('../models/User');
const Confirmation = require('../models/Confirmation');

class LoginController extends Controller {

  async new(request, response) {

    const input = request.body;
    
    this.validate(input, {
      userId: `required|string`,
      type: `required|string`,
    });

    const user = await User.findById(input.userId);
    if (!user) {
      return response.status(404).json({});
    }

    Confirmation.new(user, {
      type: input.type,
      meta: input.meta
    });

    response.json({});
  }

  async confirm(request, response) {

    const input = request.params;
    
    this.validate(input, {
      token: `required|string`,
    });
    
    Confirmation.confirm(input.token);
    
    response.json({});
  }

  async refresh(request, response) {

    const input = request.params;
    
    this.validate(input, {
      type: `required|string`,
    });

    try {
      await Confirmation.refresh(request.user, input.type);
    } catch(error) {
      switch (error.message) {
        
        case '404':
          response.status(404).json({
            error: 'Not found',
          });
          break;
        
        case '429':
          response.status(429).json({
            error: 'Too Many Requests',
          });
          break;

        default:
          response.status(500).json({
            error: 'Internal server error',
          });

      }
      return;
    }
    
    response.json({});
  }
  
  async isConfirmed(request, response) {

    const input = request.params;
    
    this.validate(input, {
      type: `required|string`,
    });

    response.json({
      confirmed: await Confirmation.isConfirmed(request.user.id, input.type),
    });
  }

}

module.exports = LoginController;
