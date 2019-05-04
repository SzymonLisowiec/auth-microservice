const Config = require('../config');
const Log = require('../Log');
const Mongoose = require('mongoose');
const Crypto = require('crypto');
const Events = require('../Events');

const User = require('./User');

const confirmationScheme = new Mongoose.Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    index: true,
  },
  meta: {
    type: Map,
  },
  expiresAt: {
    type: Date,
    index: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

confirmationScheme.index({ user: 1, type: 1 }, { unique: true });

const Confirmation = Mongoose.model('Confirmation', confirmationScheme);

Confirmation.new = async function(user, data) {
  const confirmation = await Confirmation.create({
    user: user.id,
    type: data.type,
    token: Confirmation.generateToken(user.id, data.type),
    meta: data.meta || {},
    expiresAt: Confirmation.calculateExpiresAt(data.type),
  });
  Events.emit('confirmation:new', {
    user,
    confirmation,
  });
  Log.debug('Confirmation', `New confirmation#${confirmation.id}`);
  return confirmation;
}

Confirmation.confirm = async function(token) {
  const confirmation = await Confirmation.findOne({ token });
  if (confirmation && confirmation.expiresAt.getTime() >= Date.now()) {
    await confirmation.delete();
    Events.emit('confirmation:confirmed', confirmation);
    Log.debug('Confirmation', `Confirmation#${confirmation.id} confirmed!`);
    return true;
  }
  return false;
}

Confirmation.refresh = async function(user, type) {

  const confirmation = await Confirmation.findOne({
    user,
    token,
  });

  if (!confirmation) throw new Error(404);
  if (Date.now() - confirmation.updatedAt.getTime() <= Config.confirmationRefreshDelay) throw new Error(429);

  confirmation.token = Confirmation.generateToken(user.id, type);
  confirmation.expiresAt = Confirmation.calculateExpiresAt(type);
  await confirmation.save();
  Events.emit('confirmation:refreshed', {
    user,
    confirmation,
  });
  Log.debug('Confirmation', `Confirmation#${confirmation.id} refreshed!`);
  return confirmation;
}

Confirmation.generateToken = function(userId, type) {
  return Crypto.createHmac('sha256', Config.confirmationSecretKey).update(`${userId}${type}${Date.now()}${Math.random()}`).digest('hex').toString();
}

Confirmation.calculateExpiresAt = function(type) {
  return Date.now() + parseInt(Config.confirmationExpireTime[type] || Config.confirmationExpireTime['default']) * 1000;
}

Confirmation.isConfirmed = async function(user, type) {
  return !await Confirmation.findOne({
    user,
    type: type,
  });
}

module.exports = Confirmation;
