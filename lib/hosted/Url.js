/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const QueryCollection = require('../request/Collection');

/*public abstract*/ class Url {
  constructor(endpoint, collection) {
    if (!(collection instanceof QueryCollection)) {
      throw new TypeError('Query "Collection" expected');
    }
    this._endpoint = '' + endpoint;
    this._collection = collection;
  }

  toString() {
    return [this._endpoint, this._collection.toUrn()].join('/?');
  }
}

module.exports = Url;
