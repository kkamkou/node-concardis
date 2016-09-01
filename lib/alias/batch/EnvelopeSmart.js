/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const AliasCreate = require('./AliasCreate'),
  AliasDelete = require('./AliasDelete'),
  Envelope = require('../../format/Envelope'),
  LoginHeader = require('../../format/LoginHeader');

module.exports = {
  header: (pspId, userId, password, isMultiGroup) => {
    const header = new LoginHeader(pspId, userId, password, isMultiGroup);
    return {
      delete: list => new Envelope(header, list.map(e => new AliasDelete(e))),
      create: list => new Envelope(header, list.map(e => Reflect.construct(AliasCreate, e)))
    };
  }
};
