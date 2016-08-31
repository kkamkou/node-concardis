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
  constructor(pspId, userId, password, isMultiGroup) {
    super(['OHL', pspId, password, !!isMultiGroup ? 'MGID' : null, userId]);
  }
}

module.exports = LoginHeader;
