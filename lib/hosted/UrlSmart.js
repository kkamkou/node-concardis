/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const SignedCollection = require('../request/query/SignedCollection'),
  Argument = require('../request/query/Argument'),
  Url = require('./Url');

/*public final*/ class UrlSmart extends Url {
  constructor(endpoint, secret, obj, algo) {
    super(
      endpoint,
      new SignedCollection(
        secret, 'shasignature.shasign', Object.keys(obj).map(k => new Argument(k, obj[k])), algo
      )
    );
  }

  static test(secret, obj, algo) {
    return new this('https://payengine.test.v-psp.com/Tokenization/Hostedpage', secret, obj, algo);
  }

  static production(secret, obj, algo) {
    return new this('https://secure.payengine.de/Tokenization/HostedPage', secret, obj, algo);
  }
}

module.exports = UrlSmart;