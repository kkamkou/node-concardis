/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const QueryCollection = require('../request/query/Collection');

/*public abstract*/ class Url {
  constructor(endpoint, args) {
    if (!(args instanceof QueryCollection)) {
      throw new TypeError('Query "Collection" expected');
    }
    this.endpoint = '' + endpoint;
    this.args = args;
  }

  toString() {
    const requiredOneOf = ['CARD.BRAND', 'CARD.PAYMENTMETHOD'],
      required = [
        'ACCOUNT.PSPID', 'PARAMETERS.ACCEPTURL', 'PARAMETERS.EXCEPTIONURL',
        'SHASIGNATURE.SHASIGN'
      ];

    required.forEach(k => {
      if (!this.args.has(k)) {
        throw new Error(`The "${k}" param is required`);
      }
    });

    if (requiredOneOf.filter(k => !this.args.has(k)).length === requiredOneOf.length) {
      throw new Error(`One of "${requiredOneOf.join(',')}" params is required`);
    }

    return [this.endpoint, this.args.toUrn()].join('/?');
  }
}

module.exports = Url;