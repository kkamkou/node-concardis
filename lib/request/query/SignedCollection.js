/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const crypto = require('crypto');

const Argument = require('./Argument'),
  Collection = require('./Collection');

/*public final*/ class SignedCollection extends Collection {
  constructor(passPhrase, signKey, /*...*/args, algorithm) {
    super(args);

    if (!this.args.length) {
      throw new Error('Collection is empty, nothing to sign');
    }

    this.args.sort((a, b) => b.compareTo(a));

    const hmac = crypto.createHash(algorithm || 'sha256', passPhrase)
      .update(this.args.map(a => a.toString()).map(v => v + passPhrase).join(''));

    this.args.push(new Argument(signKey, hmac.digest('hex').toUpperCase()));
  }
}

module.exports = SignedCollection;