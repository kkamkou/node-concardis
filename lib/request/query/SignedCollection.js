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

// this collection is sorted
/*public final*/ class SignedCollection extends Collection {
  constructor(secret, signKey, /*...*/args, signAlgorithm) {
    super(args);

    if (!this.args.length) {
      throw new Error('Collection is empty, nothing to sign');
    }

    this.secret = secret;
    this.signatureAlgorithm = signAlgorithm || 'sha256';

    this.args.sort((a, b) => b.compareTo(a))
      .push(new Argument(signKey, this._signature().toUpperCase()));
  }

  /** @private */
  _signature() {
    return crypto
      .createHash(this.signatureAlgorithm, this.secret)
      .update(this.args.map(a => a.toString()).map(v => v + this.secret).join(''))
      .digest('hex');
  }
}

module.exports = SignedCollection;