const Controller = require('./Controller');
const Fs = require('fs');

class SecurityController extends Controller {

  security(request, response) {
    const securityFile = `${__dirname}/../../security.txt`;
    if (Fs.existsSync(securityFile)){
      return response.end(Fs.readFileSync(securityFile).toString());
    } else {
      return response.end('No security file defined!');
    }
  }

}

module.exports = SecurityController;
