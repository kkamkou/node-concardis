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
    this.endpoint = '' + endpoint;
    this.collection = collection;
  }

  toString() {
    const requiredOneOf = ['CARD.BRAND', 'CARD.PAYMENTMETHOD'],
      required = [
        'ACCOUNT.PSPID', 'PARAMETERS.ACCEPTURL', 'PARAMETERS.EXCEPTIONURL',
        'SHASIGNATURE.SHASIGN'
      ];

    required.forEach(k => {
      if (!this.collection.has(k)) {
        throw new Error(`The "${k}" param is required`);
      }
    });

    if (requiredOneOf.filter(k => !this.collection.has(k)).length === requiredOneOf.length) {
      throw new Error(`One of "${requiredOneOf.join(',')}" params is required`);
    }

    return [this.endpoint, this.collection.toUrn()].join('/?');
  }
}

module.exports = Url;