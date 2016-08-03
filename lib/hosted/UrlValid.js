/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Url = require('./Url');

/*public final*/ class UrlValid extends Url {
  constructor(endpoint, collection) {
    super(endpoint, collection);

    const requiredOneOf = ['CARD.BRAND', 'CARD.PAYMENTMETHOD'],
      required = [
        'ACCOUNT.PSPID', 'PARAMETERS.ACCEPTURL', 'PARAMETERS.EXCEPTIONURL',
        'SHASIGNATURE.SHASIGN'
      ];

    required.forEach(k => {
      if (!this._collection.has(k)) {
        throw new Error(`The "${k}" param is required`);
      }
    });

    if (requiredOneOf.filter(k => !this._collection.has(k)).length === requiredOneOf.length) {
      throw new Error(`One of "${requiredOneOf.join(',')}" params is required`);
    }
  }
}

module.exports = UrlValid;
