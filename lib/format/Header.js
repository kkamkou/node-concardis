/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

/*public abstract*/ class Header {
  constructor() {
    this._fields = [];
  }

  toString() {
    return this._fields.join(';');
  }
}

module.exports = Header;
