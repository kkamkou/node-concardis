/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Argument = require('./Argument');

/*public abstract*/ class Collection {
  constructor(/*...*/args) {
    args.forEach(a => {
      if (!(a instanceof Argument)) {
        throw new TypeError('Query "Argument" expected');
      }
    });
    this.args = args;
  }

  has(name) {
    return !!this.args.find(a => a.name === name.toUpperCase());
  }

  toArray() {
    return this.args.map(a => a.toString());
  }

  toUrn() {
    return this.toArray().join('&');
  }
}

module.exports = Collection;