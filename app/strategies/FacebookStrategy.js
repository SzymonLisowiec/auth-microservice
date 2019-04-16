const { Strategy } = require('passport-facebook');
const AuthenticationModel = require('../models/Authentication');
const User = require('../models/User');
const Config = require('../config');

module.exports = new Strategy({
  clientID: Config.facebookClientId,
  clientSecret: Config.facebookClientSecret,
  scope: Config.facebookScope,
  profileFields: ['id', 'emails'],
  passReqToCallback: true,
  session: false,
}, async (request, accessToken, refreshToken, profile, done) => {
  
  let user, authentication;

  authentication = await AuthenticationModel.findOne({
    provider: 'facebook',
    identifier: profile.id,
  });

  if (!authentication) {

    let email = null;
    if (profile.emails && profile.emails.length > 0) {
      email = profile.emails[0].value;
      if (!(/\S+@\S+\.\S+/).test(email)) email = null;
    }
    
    try {
      user = request.user || await User.register({
        email,
      }, null, true);
    } catch(err) {
      return done(err);
    }

    authentication = await AuthenticationModel.create({
      userId: user.id,
      provider: 'facebook',
      identifier: profile.id,
    });
    
  }
  
  if (!user) user = await User.findById(authentication.userId);

  return done(null, {
    user,
    needComplete: !!user.completedAt,
  });
});
