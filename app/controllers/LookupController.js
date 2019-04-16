const Controller = require('./Controller');
const Config = require('../config');
const User = require('../models/User');

class LookupController extends Controller {

  async lookup(request, response) {
    
    const input = request.params;
    let user;
    
    this.validate(input, {
      search: `required|string`,
    });

    if ((/\S+@\S+\.\S+/).test(input.search)) {

      if (!Config.enableLookupByEmail) {
        return response.status(501).json({
          error: 'Not Implemented',
        });
      }

      user = await User.findOne({ email: input.search });
      
    } else if (User.validateName(input.search)) {

      if (!Config.supportUsernames || !Config.enableLookupByUsername) {
        return response.status(501).json({
          error: 'Not Implemented',
        });
      }

      user = await User.findOne({ name: input.search });

    }

    if (user && user.completedAt) {
      return response.json({
        id: user.id,
        name: user.name,
      });
    }

    return response.status(404).json({
      error: 'Not found'
    });
  }

}

module.exports = LookupController;
