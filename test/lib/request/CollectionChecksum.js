'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const CollectionChecksum = require(path.join(DIR_SRC, 'CollectionChecksum')),
  ObjectCollection = require(path.join(DIR_SRC, 'ObjectCollection'));

describe('RequestCollectionChecksum', () => {
  it('constructor type check', () => {
    (() => new CollectionChecksum(new Date())).should.throw(TypeError);
    (() => new CollectionChecksum(new ObjectCollection())).should.throw('Collection is empty');
  });

  it('work with utf8', () => {
    new CollectionChecksum(new ObjectCollection({quote: 'die Grüne der Wiesen'})).toString()
      .should.equal('2E01F3441D639C58B73B9EAE37C356060A1E6380C8E612BC17F223C5928DF64F');
  });

  it('ignore an empty variable', () => {
    const checksum1 = new CollectionChecksum(new ObjectCollection({hello: 1, world: ''})),
      checksum2 = new CollectionChecksum(new ObjectCollection({hello: 1})),
      sha = 'FF5035ECA4784536D3FC7D602A18495B24F216A7E7AC0ADCF8495708520140CD';
    checksum1.toString().should.equal(sha);
    checksum2.toString().should.equal(sha);
  });
});
