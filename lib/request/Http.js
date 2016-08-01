/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const request = require('request');

const Collection = require('./Collection'),
  HttpResponse = require('./HttpResponse');

/*public abstract*/ class Http {
  constructor(url, config, collection) {
    if (!(collection instanceof Collection)) {
      throw new TypeError('Query "Collection" is expected');
    }

    this._url = '' + url;
    this._config = config;
    this._collection = collection;
  }

  has(name) {
    return this._collection.has(name);
  }

  submit() {
    return new Promise((resolve, reject) => {
      request(
        Object.assign({}, this._config, {url: this._url, form: this._collection.toJson()}),
        (error, response, body) =>
          error ? reject(error) : resolve(new HttpResponse(response.statusCode, body))
      );
    });
  }
}

module.exports = Http;