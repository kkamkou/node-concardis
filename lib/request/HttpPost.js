/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const request = require('request');

const Http = require('./Http'),
  Collection = require('./Collection'),
  HttpResponse = require('./HttpResponse');

/*public final*/ class SimpleHttp /*implements*/ extends Http {
  constructor(url, collection) {
    super();

    if (!(collection instanceof Collection)) {
      throw new TypeError('Query "Collection" is expected');
    }

    this._collection = collection;
    this._config = {
      form: collection.toJson(),
      headers: {'User-Agent': 'node-concardis'},
      method: 'POST',
      timeout: 10000,
      url: '' + url
    };
  }

  get _request() {
    return request;
  }

  has(name) {
    return this._collection.has(name);
  }

  fetch() {
    return new Promise((resolve, reject) => {
      this._request(this._config, (error, response, body) =>
        error ? reject(error) : resolve(new HttpResponse(response.statusCode, body))
      );
    });
  }
}

module.exports = SimpleHttp;
