const Log = require('../Log');
const Config = require('../config');

module.exports = function(required) {
  return async function(request, response, next) {
    
    let header = request.get('Authorization')
    if (!header) return false;
    header = header.split(' ');
    if (header.length !== 2 || header[0].toLowerCase() !== 'basic' || header[1] !== Config.internalApiKey) return false;

    Log.debug('InternalAuthorizationMiddleware', 'Successful internal authorization.');
    next();
  };
};
