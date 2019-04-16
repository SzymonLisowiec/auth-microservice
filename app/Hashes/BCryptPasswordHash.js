const Hash = require('./Hash');
const Log = require('../Log');
const Config = require('../config');
const BCrypt = require('bcrypt');

class Argon2Hash extends Hash {

  constructor() {
    super();
    this.saltRounds = Config.bcryptSaltRounds || 10; // TODO: Add warning while using default value
  }

  async verify(hash, password) {
    try {
      return await BCrypt.compare(password, hash);
    } catch (error) {
      Log.debug('Hash/BCrypt', `Cannot verify password, error: ${error}`);
    }
    return false;
  }

  async hash(password) {
    try {
      return await BCrypt.hash(password);
    } catch (error) {
      Log.debug('Hash/BCrypt', `Cannot hash password, error: ${error}`);
    }
    return false;
  }

}

module.exports = new Argon2Hash();
