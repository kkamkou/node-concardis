/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const CollectionChecksum = require('../request/CollectionChecksum'),
  SignedCollection = require('../request/SignedCollection'),
  ObjectCollection = require('../request/ObjectCollection'),
  Url = require('./Url');

/*public final*/ class UrlSmart extends Url {
  constructor(endpoint, checksum, collection) {
    super(endpoint, new SignedCollection('shasignature.shasign', checksum, collection));
  }

  static test(secret, obj, algorithm) {
    const collection = new ObjectCollection(obj);
    return new this(
      'https://payengine.test.v-psp.com/Tokenization/Hostedpage',
      new CollectionChecksum(collection, secret, algorithm),
      collection
    );
  }

  static production(secret, obj, algorithm) {
    const collection = new ObjectCollection(obj);
    return new this(
      'https://secure.payengine.de/Tokenization/HostedPage',
      new CollectionChecksum(collection, secret, algorithm),
      collection
    );
  }
}

module.exports = UrlSmart;