const Hash = require('./Hash');
const Log = require('../Log');
const Argon2 = require('argon2');

class Argon2Hash extends Hash {

  constructor() {
    super();
  }

  async verify(hash, password) {
    try {
      return await Argon2.verify(hash, password);
    } catch (error) {
      Log.debug('Hash/Argon2', `Cannot verify password, error: ${error}`);
    }
    return false;
  }

  async hash(password) {
    try {
      return await Argon2.hash(password);
    } catch (error) {
      Log.debug('Hash/Argon2', `Cannot hash password, error: ${error}`);
    }
    return false;
  }

}

module.exports = new Argon2Hash();
