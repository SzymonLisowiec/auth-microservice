const Controller = require('./Controller');

class LookupController extends Controller {

  async user(request, response) {
    response.status(200).json({
      user: request.user.getNotHiddenFields(),
    });
  }

}

module.exports = LookupController;
