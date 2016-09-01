/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

/*public final*/ class HttpResponsePlain {
  constructor(code, body) {
    this._code = code;
    this._body = body;
  }

  get code() {
    return this._code;
  }

  toString() {
    return this._body;
  }
}

module.exports = HttpResponsePlain;
