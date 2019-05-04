const Controller = require('./Controller');
const Config = require('../config');
const Authentication = require('../models/Authentication');
const User = require('../models/User');
const Hashes = require('../Hashes');

class RegisterController extends Controller {

  async register(request, response) {
    
    const input = request.body;
    let user = request.user;

    if (input.passwordConfirmation) {
      input.password_confirmation = input.passwordConfirmation;
    }
    
    let additionalFieldsValidationRules = {};
    for (const field in Config.additionalFields) {
      additionalFieldsValidationRules[field] = Config.additionalFields[field].validation;
    }

    this.validate(input, {
      email: `${!user || !user.email ? 'required|' : ''}email`,
      name: `${Config.supportUsernames ? 'required|' : ''}string`
            + `|min:${Config.userNameMinLength}`
            + `|max:${Config.userNameMaxLength}`,
      password: 'required|string'
                + (Config.passwordConfirmation ? '|confirmed' : '')
                + `|min:${Config.passwordMinLength}`
                + `|max:${Config.passwordMaxLength}`,
      ...additionalFieldsValidationRules,
    });

    const userData = {};
    if (input.email) userData.email = input.email;
    if (input.name) userData.name = input.name;
    userData.completedAt = new Date();
    for (const field in Config.additionalFields) {
      if (input[field]) userData[field] = input[field];
    }

    try {
      user = await User.register(userData, user, false, request);
    } catch(error) {
      return response.status(400).json({ error: error.message });
    }

    if (user.email) {

      const passwordHash = Hashes[Config.passwordHash];
      if (!passwordHash) return response.status(500).json({ error: 'Cannot verify password!' });

      try {
        await Authentication.create({
          user,
          provider: 'local',
          identifier: user.email,
          attributes: {
            password: await passwordHash.hash(input.password),
            passwordHash: Config.passwordHash,
          },
        });
      } catch(err) {
        console.dir(err);
        // the authentication already registered for local provider
      }
      
    }

    return response.json({
      email: user.email
    });
  }

}

module.exports = RegisterController;
