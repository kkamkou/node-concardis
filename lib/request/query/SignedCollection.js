/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const crypto = require('crypto');

const Collection = require('./Collection');

/*public final*/ class SignedCollection extends Collection {
  constructor(passPhrase, signKey, /*...*/args) {
    super(args);
    this.phrase = '' + passPhrase;
    this.key = signKey.toUpperCase();
  }

  toArray() {
    const sorted = this.args
      .sort((a, b) => b.compareTo(a))
      .map(a => a.toString());

    const hmac = crypto.createHmac('sha256', this.phrase);
    hmac.update(sorted.concat([]).map(v => v + this.phrase).join(''));

    return sorted.concat([`${this.key}=${hmac.digest('hex').toUpperCase()}`]);
  }
}

module.exports = SignedCollection;