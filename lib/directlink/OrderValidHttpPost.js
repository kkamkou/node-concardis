/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Http = require('../request/Http'),
  HttpPost = require('../request/HttpPost');

/*public final*/ class OrderValidHttpPost /*implements*/ extends Http {
  constructor(origin) {
    super(); // js trash

    if (!(origin instanceof HttpPost)) {
      throw new TypeError('"HttpPost" is expected');
    }

    this._origin = origin;
    this._requiredIfNoAlias = ['CARDNO', 'ED', 'CVC'/* or ECI*/],
    this._required = [
      'PSPID', 'ORDERID', 'AMOUNT', 'CURRENCY', 'OPERATION', 'SHASIGN', 'USERID', 'PSWD'
    ];
  }

  fetch() {
    this._required.forEach(k => {
      if (!this._origin.has(k)) {
        throw new Error(`The "${k}" param is required`);
      }
    });

    if (!this._origin.has('ALIAS')) {
      this._requiredIfNoAlias.forEach(k => {
        /* istanbul ignore else */
        if (!this._origin.has(k)) {
          throw new Error(`The "${k}" param is required`);
        }
      });
    }
    return this._origin.fetch();
  }
}

module.exports = OrderValidHttpPost;
