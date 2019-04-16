const Passport = require('passport');
const Config = require('../config');

Config.strategies.forEach((strategy) => {
  
  strategy = `${strategy.charAt(0).toUpperCase()}${strategy.slice(1)}`; // uppercase first letter

  try {
    const strategyInstance = require(`${__dirname}/../strategies/${strategy}Strategy`);
    Passport.use(strategyInstance);
  } catch(error) {
    throw new Error(`Cannot load ${strategy} strategy file! Error: ${error.message}`);
  }
  
});
