/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Order = require('./Order');

/*public final*/ class OrderValid extends Order {
  constructor(request) {
    super(request);

    const requiredIfNoAlias = ['CARDNO', 'ED', 'CVC'/* or ECI*/],
      required = [
        'PSPID', 'ORDERID', 'AMOUNT', 'CURRENCY', 'OPERATION', 'SHASIGN', 'USERID', 'PSWD'
      ];

    required.forEach(k => {
      if (!this._request.has(k)) {
        throw new Error(`The "${k}" param is required`);
      }
    });

    if (!this._request.has('ALIAS')) {
      requiredIfNoAlias.forEach(k => {
        /* istanbul ignore else */
        if (!this._request.has(k)) {
          throw new Error(`The "${k}" param is required`);
        }
      });
    }
  }
}

module.exports = OrderValid;
