/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const CollectionChecksum = require('../../request/CollectionChecksum'),
  HttpPost = require('../../request/HttpPost'),
  HttpResponseXml = require('../../request/HttpResponseXml'),
  ObjectCollection = require('../../request/ObjectCollection'),
  Order = require('../Order'),
  OrderValidHttpPost = require('./OrderValidHttpPost'),
  SignedCollection = require('../../request/SignedCollection');

const instance = (endpoint, secret, obj, algorithm) => {
  const coll = new ObjectCollection(obj);
  return new Order(
    new HttpResponseXml(
      new OrderValidHttpPost(
        new HttpPost(
          endpoint,
          new SignedCollection('shasign', new CollectionChecksum(coll, secret, algorithm), coll)
        )
      )
    )
  );
};

module.exports = {
  test: (secret, obj, algorithm) =>
    instance('https://secure.payengine.de/ncol/test/maintenancedirect.asp', secret, obj, algorithm),
  production: (secret, obj, algorithm) =>
    instance('https://secure.payengine.de/ncol/prod/maintenancedirect.asp', secret, obj, algorithm)
};
