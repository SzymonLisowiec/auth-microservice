const Mongoose = require('mongoose');
const Express = require('express');

const Log = require('./Log');
const Config = require('./config');
const Router = require('./router');

require('./strategies');

class App {
  
  constructor() {

    Log.debug('Configuration', JSON.stringify(Config, null, 2));
    
    this.server = new Express();
    this.server.use(Express.json());
    this.server.use(Express.urlencoded({ extended: true }));
    this.server.use(Router);

    this.init();

  }

  async init() {
    
    await this.databaseConnect();
    await this.runWebService();

  }

  async databaseConnect() {
    const database = `mongodb://${Config.databaseHost}:${Config.databasePort}/${Config.databaseName}`;
    try {
      await Mongoose.connect(database, {
        useNewUrlParser: true,
        useCreateIndex: true,
        user: Config.databaseUser,
        pass: Config.databasePassword,
      });
      Log.info('Database', 'Connected!');
    } catch(error) {
      Log.error('Database', `Cannot connect to database ${database}`);
      throw error;
    }
  }

  runWebService() {
    return new Promise((resolve, reject) => {
      try {
        this.server.listen(Config.port, Config.host, () => {
          Log.info('WebService', `Listening on ${Config.host}:${Config.port}...`);
          resolve();
        });
      } catch(error) {
        Log.error('WebService', `Cannot run server on ${Config.host}:${Config.port}`);
        reject(error);
      }
    });
  }
  
}

module.exports = new App();
