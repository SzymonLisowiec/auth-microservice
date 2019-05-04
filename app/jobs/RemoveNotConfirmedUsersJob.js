const Job = require('./Job');
const Log = require('../Log');
const Config = require('../config');

const Confirmation = require('../models/Confirmation');

class RemoveNotConfirmedUsersJob extends Job {

  async exec() {

      const confirmations = await Confirmation.find({
        type: 'registration',
        expiresAt: {
          $lt: new Date(Date.now() - Config.removeNotConfirmedUsersIn * 86400000),
        },
      }).populate('user').exec();
      
      confirmations.forEach((confirmation) => {
        confirmation.user.remove();
      });

      if (confirmations.length) {
        Log.debug('RemoveNotConfirmedUsersJob', `Removed ${confirmations.length} not confirmed users.`);
      }
    
  }

}

module.exports = new RemoveNotConfirmedUsersJob();
