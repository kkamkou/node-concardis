// .catch(e => setImmediate(() => { throw e; }));

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

    const requiredIfNoAlias = ['CARDNO', 'ED', 'CVC'],
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
        if (!this._request.has(k)) {
          throw new Error(`The "${k}" param is required`);
        }
      });
    }
  }
}

module.exports = OrderValid;
