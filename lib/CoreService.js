const Promise = require('bluebird');

class CoreService {
  static heavyLifting() {
    return Promise.delay(500)
      .then(() => misspelledVariable);
  }

}


module.exports = CoreService;
