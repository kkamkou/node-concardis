/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Http = require('../../request/Http'),
  HttpPost = require('../../request/HttpPost');

/*public final*/ class OrderValidHttpPost /*implements*/ extends Http {
  constructor(origin) {
    super(); // js trash

    if (!(origin instanceof HttpPost)) {
      throw new TypeError('"HttpPost" is expected');
    }

    this._origin = origin;
    this._requiredIfNoPayId = 'ORDERID';
    this._required = ['AMOUNT', 'OPERATION', 'PSPID', 'PSWD', 'SHASIGN', 'USERID'];
  }

  has(name) {
    return this._origin.has(name);
  }

  fetch() {
    this._required.forEach(k => {
      if (!this.has(k)) {
        throw new Error(`The "${k}" param is required`);
      }
    });
    if (!this.has('PAYID') && !this.has(this._requiredIfNoPayId)) {
      throw new Error(`The "${this._requiredIfNoPayId}" param is required`);
    }
    return this._origin.fetch();
  }
}

module.exports = OrderValidHttpPost;
