const { EventEmitter } = require('events');

class Events extends EventEmitter {

  constructor() {
    super();
  }

}

module.exports = new Events();
