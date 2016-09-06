/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Alias = require('./Alias');

/*public final*/ class Delete extends Alias {
  constructor(alias) {
    super('DELALIAS', alias);
  }
}

module.exports = Delete;
