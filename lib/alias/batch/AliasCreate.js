/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Alias = require('./Alias');

/*public final*/ class AliasCreate extends Alias {
  constructor(alias, cn, cardNo, expDate, brand, pspId) {
    super('ADDALIAS', alias, cn, cardNo, expDate, brand, pspId);
  }
}

module.exports = AliasCreate;
