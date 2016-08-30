/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Header = require('./Header');

/*public final*/ class LoginHeader extends Header {
  constructor(pspId, userId, password, multiGroup) {
    super();
    this._fields.push('OHL');
    this._fields.push(pspId);
    this._fields.push(password);
    this._fields.push(!!multiGroup ? 'MGID' : null);
    this._fields.push(userId);
  }
}

module.exports = LoginHeader;
