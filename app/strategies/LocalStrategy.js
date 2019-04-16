const { Strategy } = require('passport-local');
const AuthenticationModel = require('../models/Authentication');
const User = require('../models/User');
const Config = require('../config');
const Hashes = require('../Hashes');
const EMailNormalizer = require('normalize-email');

module.exports = new Strategy({
  usernameField: 'login',
  session: false,
}, async (username, password, done) => {
  
  let user, authentication;
  
  if (Config.supportUsernames && !(/\S+@\S+\.\S+/).test(username)) {
    
    user = await User.findOne({
      name: username,
    });
    
    if (user) {
      
      authentication = await AuthenticationModel.findOne({
        userId: user.id,
        provider: 'local',
      });

    }

  } else {
    
    username = (Config.normalizeEmails ? EMailNormalizer(username) : username).toLowerCase();

    authentication = await AuthenticationModel.findOne({
      provider: 'local',
      identifier: username,
    });

  }

  if (!authentication || !authentication.attributes) return done(new Error('Wrong credentials'));
  
  const passwordHash = Hashes[authentication.attributes.passwordHash];
  if (!passwordHash) return done(new Error('Cannot verify password!'));

  if (!await passwordHash.verify(authentication.attributes.password, password)) return done(new Error('Wrong credentials'));
  
  if (!user) user = await User.findById(authentication.userId);

  return done(null, {
    user,
    needComplete: !!user.completedAt,
  });
});
