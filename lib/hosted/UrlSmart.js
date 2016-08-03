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
  UrlValid = require('./UrlValid');

const instance = (endpoint, secret, obj, algorithm) => {
  const collection = new ObjectCollection(obj);
  return new UrlValid(
    endpoint,
    new SignedCollection(
      'shasignature.shasign',
      new CollectionChecksum(collection, secret, algorithm),
      collection
    )
  );
};

module.exports = {
  test: (secret, obj, algorithm) =>
    instance('https://payengine.test.v-psp.com/Tokenization/Hostedpage', secret, obj, algorithm),
  production: (secret, obj, algorithm) =>
    instance('https://secure.payengine.de/Tokenization/HostedPage', secret, obj, algorithm)
};
