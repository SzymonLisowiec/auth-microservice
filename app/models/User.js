const Mongoose = require('mongoose');
const Log = require('../Log');
const Config = require('../config');
const Token = require('../Token');
const Events = require('../Events');
const Authentication = require('./Authentication');
const Confirmation = require('./Confirmation');
const EMailNormalizer = require('normalize-email');

const modelSchemaFields = {
  email: {
    type: String,
    index: true,
  },
  name: Config.supportUsernames ? {
    type: String,
    index: true,
  } : false,
};

for (const field in Config.additionalFields) {
  const data = Config.additionalFields[field];
  modelSchemaFields[field] = {
    type: data.type,
    index: !!data.index,
    unique: !!data.unique,
    default: data.default || undefined,
  }
}

const modelSchema = new Mongoose.Schema({
  ...modelSchemaFields,
  completedAt: Date,
}, {
  timestamps: true,
  versionKey: false,
});

const User = Mongoose.model('User', modelSchema);

User.prototype.getToken = async function(tokenEngine) {
  Events.emit('user:authenticated', this);
  return Token.sign(this, tokenEngine);
};

User.register = async function(data, user, returnUserIfExists, request) {
  
  data.email = (Config.normalizeEmails ? EMailNormalizer(data.email) : data.email).toLowerCase();

  if (user && user.completedAt) {
    throw new Error('Registration already completed.');
  }
  
  
  if (data.email) {
    const emailUser = await User.findOne({ email: data.email });
    if (emailUser) {
      if (returnUserIfExists) return emailUser;
      else throw new Error(`E-mail ${data.email} is already registered.`);
    }
  }
  
  if (data.name) {
    if (Config.supportUsernames) {

      if (!User.validateName(data.name)) {
        throw new Error(`Username must be between ${Config.userNameMinLength} and ${Config.userNameMaxLength} characters and may contain ${Config.userNameCharacters}`);
      }

      if (await User.findOne({ name: data.name })) {
        throw new Error('This username is already registered.');
      }

    } else {
      delete data.name;
    }
  }
  
  if (!user) {
    user = new User(data);
  } else {
    for (const field of data) {
      user[field] = data[field];
    }
  }
  
  await user.save();
  Events.emit('user:registered', user);

  if (Config.enableConfirmations) {
    const confirmation = await Confirmation.new(user, {
      type: 'registration',
    });
  }

  return user;
};

User.validateName = function(name) {
  return (new RegExp(`^[${Config.userNameCharacters}]{${Config.userNameMinLength},${Config.userNameMaxLength}}$`)).test(name);
};

User.prototype.getNotHiddenFields = function() {
  let user = this.toObject();
  user.id = user._id;
  delete user._id;
  for (const field in Config.additionalFields) {
    if (Config.additionalFields[field].hidden) delete user[field];
  }
  return user;
}

User.prototype.remove = async function() {
  await this.deleteOne();
  await Confirmation.deleteMany({ user: this });
  await Authentication.deleteMany({ user: this });
  Events.emit('user:removed', this);
}

module.exports = User;
