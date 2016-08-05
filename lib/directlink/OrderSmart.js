// .catch(e => setImmediate(() => { throw e; }));

/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const OrderValid = require('./OrderValid'),
  HttpPost = require('../request/HttpPost'),
  SignedCollection = require('../request/SignedCollection'),
  ObjectCollection = require('../request/ObjectCollection'),
  CollectionChecksum = require('../request/CollectionChecksum');

const instance = (endpoint, secret, obj, algorithm) => {
  const coll = new ObjectCollection(obj);
  return new OrderValid(
    new HttpPost(
      endpoint,
      new SignedCollection('shasign', new CollectionChecksum(coll, secret, algorithm), coll)
    )
  );
};

module.exports = {
  test: (secret, obj, algorithm) =>
    instance('https://secure.payengine.de/ncol/test/orderdirect.asp', secret, obj, algorithm),
  production: (secret, obj, algorithm) =>
    instance('https://secure.payengine.de/ncol/prod/orderdirect.asp', secret, obj, algorithm)
};
