/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

/*public final*/ class Argument {
  constructor(name, value) {
    this.name = name.toUpperCase();
    this.value = value;
  }

  toString() {
    return [this.name, this.value].join('=');
  }

  compareTo(arg) {
    if (!(arg instanceof Argument)) {
      throw new TypeError('Query "Argument" is expected');
    }
    return arg.toString().localeCompare(this.toString());
  }
}

module.exports = Argument;