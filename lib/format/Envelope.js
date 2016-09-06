/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Entry = require('./Entry'),
  Header = require('./Header');

/*public final*/ class Envelope {
  constructor(header, entries) {
    if (!(header instanceof Header)) {
      throw new TypeError('Expected a "Header" instance');
    }
    if (!Array.isArray(entries) || entries.find(e => !(e instanceof Entry))) {
      throw new TypeError('Expected an array of "Entry"');
    }

    this._header = header;
    this._entries = entries;
    this._eol = "\r\n"; // eslint-disable-line
  }

  toString() {
    return [
      this._header.toString() + ';',
      this._entries.map(e => e.toString() + ';').join(this._eol),
      'OTF;'
    ].join(this._eol);
  }
}

module.exports = Envelope;
