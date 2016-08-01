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
    // ugly js fixes
    if (!args) {
      args = [];
    }

    if (args instanceof Collection) {
      args = args.toArray();
    } else {
      args.forEach(a => {
        if (!(a instanceof Argument)) {
          throw new TypeError('Query "Argument" expected');
        }
      });
    }

    this.args = args.concat([]).sort((a, b) => b.compareTo(a));
  }

  has(name) {
    return !!this.args.find(a => a.name === name.toUpperCase());
  }

  size() {
    return this.args.length;
  }

  toArray() {
    return this.args.concat([]);
  }

  toJson() {
    const result = {};
    this.args.forEach(a => result[a.name] = a.value);
    return result;
  }

  toUrn() {
    return this.toArray().map(a => a.toString()).join('&');
  }
}

module.exports = Collection;