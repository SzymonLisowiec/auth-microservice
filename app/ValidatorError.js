class ValidatorError extends Error {

  constructor(validator) {
    super('Validation error');

    this.validator = validator;

  }

}

module.exports = ValidatorError;
