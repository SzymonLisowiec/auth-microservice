const Log = require('../Log');
const Config = require('../config');
const Engines = require('./engines');

class Token {

  static loadEngine(engine) {
    if (!engine) engine = Config.defaultToken;
    if (Config.supportTokens.indexOf(engine) === -1) {
      Log.warn('Token', `Token ${engine} isn't supported, so will use default (${Config.defaultToken}).`);
      engine = Config.defaultToken;
    }
    return new Engines[engine]();
  }

  /**
   * @param {Request} request Express.js's request
   * @param {String} engine e.g. jsonwebtoken
   * @returns {*} data containing userId or false
   */
  static verify(request, engine) {
    return this.loadEngine(engine).verify(request);
  }

  /**
   * @param {Object} data 
   * @param {String} engine e.g. jsonwebtoken
   * @returns {Object} data like token, refresh token, expiration time etc.
   */
  static sign(data, engine) {
    return this.loadEngine(engine).sign(data);
  }

}

module.exports = Token;
