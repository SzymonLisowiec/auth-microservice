const Mongoose = require('mongoose');

const authenticationSchema = new Mongoose.Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  identifier: {
    type: String,
  },
  attributes: {
    type: Mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
  versionKey: false,
});

authenticationSchema.index({ user: 1, provider: 1 }, { unique: true });
authenticationSchema.index({ identifier: 1, provider: 1 }, { unique: true });

module.exports = Mongoose.model('Authentication', authenticationSchema);
