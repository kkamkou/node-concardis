/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Argument = require('./Argument'),
  Collection = require('./Collection'),
  CollectionChecksum = require('./CollectionChecksum');

/*public final*/ class SignedCollection extends Collection {
  constructor(signKey, checksum, /*...*/args) {
    super(args);

    if (!(checksum instanceof CollectionChecksum)) {
      throw new TypeError('Query "CollectionChecksum" expected');
    }

    this.args.push(new Argument(signKey, checksum.toString()));
  }
}

module.exports = SignedCollection;