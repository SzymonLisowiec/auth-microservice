const Validator = require('validatorjs');
const ValidatorError = require('../ValidatorError');

class Controller {

  constructor() {

  }

  validate(input, rules, customErrorMessages) {
    
    const validator = new Validator(input, rules, customErrorMessages);
    
    if (validator.fails()) {
      throw new ValidatorError(validator);
    }

  }

}

module.exports = Controller;
