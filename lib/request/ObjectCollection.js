/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Argument = require('./Argument'),
  Collection = require('./Collection');

/*public final*/ class ObjectCollection extends Collection {
  constructor(obj) {
    super(Object.keys(obj).map(k => new Argument(k, obj[k])));
  }
}

module.exports = ObjectCollection;