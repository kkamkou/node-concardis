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

/*public final*/ class CollectionChecksum {
  constructor(collection, secret, signAlgorithm) {
    if (!(collection instanceof Collection)) {
      throw new TypeError('Query "Collection" is expected');
    }

    if (!collection.size()) {
      throw new Error('Collection is empty');
    }

    this.secret = secret;
    this.collection = collection;
    this.signatureAlgorithm = signAlgorithm || 'sha256';
  }

  toString() {
    return crypto
      .createHash(this.signatureAlgorithm, this.secret)
      .update(
        this.collection.toArray()
          .filter(v => v.value !== '')
          .map(v => v.toString() + this.secret)
          .join('')
      )
      .digest('hex').toUpperCase();
  }
}

module.exports = CollectionChecksum;
