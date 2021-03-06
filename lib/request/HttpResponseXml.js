/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const xml2js = require('xml2js');

const Http = require('./Http'),
  HttpResponse = require('./HttpResponse');

/*public final*/ class HttpResponseXml /*implements*/ extends HttpResponse {
  constructor(request) {
    super(); // js trash

    if (!(request instanceof Http)) {
      throw new TypeError('"Http" request is expected');
    }

    this._request = request;
  }

  toJson() {
    return new Promise((resolve, reject) => {
      this.toString()
        .then(xml => xml2js.parseString(xml, (err, json) => err ? reject(err) : resolve(json)))
        .catch(reject);
    });
  }

  toString() {
    return new Promise((resolve, reject) => {
      return this._request.fetch()
        .then(response => resolve(response.toString()))
        .catch(reject);
    });
  }
}

module.exports = HttpResponseXml;
