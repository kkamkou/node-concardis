/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

/*public interface*/ class Http {
  /*Boolean*/ has(name) { // eslint-disable-line
    throw new Error('Please, re-define me');
  }

  /*Promise*/ fetch() {
    throw new Error('Please, re-define me');
  }
}

module.exports = Http;
