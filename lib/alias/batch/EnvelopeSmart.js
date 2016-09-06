/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Create = require('./Create'),
  Delete = require('./Delete'),
  Envelope = require('../../format/Envelope'),
  LoginHeader = require('../../format/LoginHeader');

module.exports = {
  header: (pspId, userId, password, isMultiGroup) => {
    const header = new LoginHeader(pspId, userId, password, isMultiGroup);
    return {
      delete: list => new Envelope(header, list.map(e => new Delete(e))),
      create: list =>
        new Envelope(header, list.map(e => {
          // old node.js versions workaround
          const cls = Create.bind.apply(Create, [null].concat(e));
          return new cls();
        }))
    };
  }
};
