/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const xml2js = require('xml2js');

/*public abstract*/ class Order {
  constructor(request) {
    this._request = request;
  }

  toJson() {
    return new Promise((resolve, reject) => {
      this.toString()
        .then(
          xml =>
            xml2js.parseString(xml, (err, json) =>
              err ? reject(err) : resolve(json.ncresponse.$))
        )
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

module.exports = Order;
