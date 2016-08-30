/**
 * Licensed under the MIT License
 *
 * @author   Kanstantsin A Kamkou (2ka.by)
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     https://github.com/kkamkou/node-concardis
 */

'use strict';

const Entry = require('./Entry'),
  Header = require('./Header'),
  Footer = require('./Footer');

/*public final*/ class Envelope {
  constructor(header, footer, entries) {
    if (!(header instanceof Header)) {
      throw new TypeError('Expected a "Header" instance');
    }
    if (!(footer instanceof Footer)) {
      throw new TypeError('Expected a "Footer" instance');
    }
    if (!Array.isArray(entries) || entries.find(e => !(e instanceof Entry))) {
      throw new TypeError('Expected an array of "Entry"');
    }

    this._header = header;
    this._footer = footer;
    this._entries = entries;
    this._eol = "\r\n";
  }

  toString() {
    return [
      this._header.toString(),
      this._entries.map(e => e.toString()),
      this._footer.toString()
    ].join(this._eol);
  }
}

module.exports = Envelope;
