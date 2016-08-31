/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const ObjectCollection = require('../request/ObjectCollection'),
  HttpResponseXml = require('../request/HttpResponseXml'),
  HttpPost = require('../request/HttpPost'),
  LoginHeader = require('../format/LoginHeader'),
  Envelope = require('../format/Envelope'),
  Batch = require('./Batch');

const instance = (endpoint, pspId, userId, password, isMultiGroup) => {
  const header = new LoginHeader(pspId, userId, password, isMultiGroup),
    defaultCollection = {reply_type: 'XML', process_mode: 'SEND'};
  return {
    'delete': function (list) {
      const collection = new ObjectCollection(
        Object.assign({file: (new Envelope(header, [])).toString()}, defaultCollection)
      );
      return new Batch(new HttpResponseXml(new HttpPost(endpoint, collection)));
    }
  };
};

module.exports = {
  test: function (pspId, userId, password, isMultiGroup) {
    return instance.apply(
      null, ['https://secure.payengine.de/ncol/test/AFU_agree.asp']
        .concat(Array.prototype.slice.call(arguments))
    );
  },
  production: function (pspId, userId, password, isMultiGroup) {
    return instance.apply(
      null, ['https://secure.payengine.de/ncol/prod/AFU_agree.asp']
        .concat(Array.prototype.slice.call(arguments))
    )
  }
};
