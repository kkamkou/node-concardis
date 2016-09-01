/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Entry = require('../../format/Entry');

/*public final*/ class Alias extends Entry {
  constructor(operation, alias, cn, cardNo, expDate, brand, pspId) {
    super([operation, alias, cn, cardNo, expDate, brand, pspId]);
  }
}

module.exports = Alias;
