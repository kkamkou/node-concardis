/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const _ = require('lodash');

/*public abstract*/ class Entry {
  constructor(fields) {
    this._fields = fields || [];
  }

  toString() {
    return this._fields.map(v => _.isString(v) ? v.replace(/;+/g, ' ') : v).join(';');
  }
}

module.exports = Entry;
