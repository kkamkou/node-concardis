/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Command = require('./Command'),
  HttpPost = require('../request/HttpPost'),
  HttpResponseXml = require('../request/HttpResponseXml'),
  ObjectCollection = require('../request/ObjectCollection');

const instance = function (endpoint) {
  const callback = function (processMode, advancedFields) {
    return new Command(
      new HttpResponseXml(
        new HttpPost(
          endpoint,
          new ObjectCollection(
            Object.assign(
              {PROCESS_MODE: processMode},
              {ALIASOPERATION: 'BYMERCHANT', MODE: 'SYNC', REPLY_TYPE: 'XML'},
              advancedFields
            )
          )
        )
      )
    );
  };

  return {
    check: content =>
      callback('CHECK', {FILE_REFERENCE: (new Date()).toUTCString(), FILE: content}),
    process: fileId =>
      callback('PROCESS', {PFID: fileId})
  };
};

module.exports = {
  test: () => instance('https://secure.payengine.de/ncol/test/AFU_agree.asp'),
  production: () => instance('https://secure.payengine.de/ncol/prod/AFU_agree.asp')
};
