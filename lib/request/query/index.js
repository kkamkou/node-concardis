/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

/* istanbul ignore next */
const path = require('path');

/* istanbul ignore next */
['Argument', 'Collection', 'SignedCollection', 'SimpleCollection']
  .forEach(c => module.exports[c] = require(path.join(__dirname, c)));
