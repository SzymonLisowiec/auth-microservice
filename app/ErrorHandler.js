const ValidatorError = require('./ValidatorError');

module.exports = (error, request, response, next) => {
  if(!error) return;
  console.dir(error);

  const result = {
    error: 'Internal server error',
  };
  
  switch (error.constructor) {

    case ValidatorError:
      response.status(400);
      result.errors = error.validator.errors.all();
      result.error = Object.values(result.errors)[0][0];
      break;

    default:
      if (error && error.statusCode) {
        response.status(error.statusCode);
      } else {
        response.status(500);
      }

  }
  
  response.json(result);
  response.end();

}
