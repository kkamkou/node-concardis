/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const HttpResponse = require('../request/HttpResponse');

/*public final*/ class Command {
  constructor(origin) {
    if (!(origin instanceof HttpResponse)) {
      throw new TypeError('"HttpResponse" is expected');
    }
    this._origin = origin;
  }

  toJson() {
    return new Promise((resolve, reject) => {
      this._origin.toJson()
        .then(json => resolve(json.AFU_REPLY))
        .catch(reject);
    });
  }

  toString() {
    return this._origin.toString();
  }
}

module.exports = Command;
