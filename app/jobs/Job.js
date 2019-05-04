const { CronJob } = require('cron');
const Log = require('../Log');

class Job {

  exec() {
    Log.warn('Job', `${this.constructor.name} doesn't have defined exec() method!`);
  }

  schedule(time) {
    return new CronJob(time, this.exec.bind(this));
  }

}

module.exports = Job;
