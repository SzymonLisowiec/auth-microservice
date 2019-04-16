const Log = require('../Log');
const Token = require('../Token');
const User = require('../models/User');

module.exports = function(required) {
  return async function(request, response, next) {
  
    const token = await Token.verify(request);
    if (token && token.userId) {
      request.user = await User.findById(token.userId);
      if (request.user) {
        Log.debug(`Successful authorization for user ${request.user.id}`);
        next();
        return;
      }
    }
    
    if (required) {
      Log.debug(`Failure authorization`);
      return response.status(401).json({
        error: 'Unauthorized',
      });
    }

    next();
  };
};
