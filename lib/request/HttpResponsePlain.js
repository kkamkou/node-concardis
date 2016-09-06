/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const HttpResponse = require('./HttpResponse');

/*public final*/ class HttpResponsePlain /*implements*/ extends HttpResponse {
  constructor(code, body) {
    super();
    this._code = code;
    this._body = body;
  }

  get code() {
    return this._code;
  }

  toString() {
    return this._body;
  }

  toJson() {
    return JSON.parse(this.toString());
  }
}

module.exports = HttpResponsePlain;
