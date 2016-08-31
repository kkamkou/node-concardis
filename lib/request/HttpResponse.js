/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

/*public interface*/ class HttpResponse {
  /*Promise*/ toJson() {
    throw new Error('Please, re-define me');
  }

  /*Promise*/ toString() {
    throw new Error('Please, re-define me');
  }
}

module.exports = HttpResponse;
