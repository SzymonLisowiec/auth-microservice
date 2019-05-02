const Mongoose = require('mongoose');
const Express = require('express');
const Passport = require('passport');

const Log = require('./Log');
const Config = require('./config');
const Router = require('./Router');
const Events = require('./Events');
const LocalStrategy = require('./strategies/LocalStrategy');

class App {
  
  constructor() {
    
    this.strategies = [
      LocalStrategy(),
    ];

    this.server = new Express();
    this.server.use(Express.json());
    this.server.use(Express.urlencoded({ extended: true }));
    this.server.use((new Router(this)).router);

  }

  async run() {
    
    this.strategies.forEach(strategy => Passport.use(strategy));

    await this.databaseConnect();
    await this.runWebService();

    Events.emit('initialized');

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
      Log.info('Database', `Connected to database ${database}`);
      Events.emit('database:connected');
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
          Events.emit('webservice:listening');
          resolve();
        });
      } catch(error) {
        Log.error('WebService', `Cannot run server on ${Config.host}:${Config.port}`);
        reject(error);
      }
    });
  }
  
  useStrategy(strategy) {
    Log.info('Strategies', `Used ${strategy.name} strategy.`);
    this.strategies.push(strategy);
  }

  /**
   * Aliases for methods in Events class.
   */
  on(...args) { return Events.on(...args); }
  once(...args) { return Events.once(...args); }
  off(...args) { return Events.off(...args); }
  
}

module.exports = new App();
module.exports.Config = Config;
module.exports.Log = Log;
module.exports.Events = Events;
module.exports.Strategies = require('./strategies');
