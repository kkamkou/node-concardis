'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const CollectionChecksum = require(path.join(DIR_SRC, 'CollectionChecksum')),
  SimpleCollection = require(path.join(DIR_SRC, 'SimpleCollection'));

describe('RequestCollectionChecksum', () => {
  it('constructor type check', () => {
    (() => new CollectionChecksum(new Date())).should.throw(TypeError);
    (() => new CollectionChecksum(new SimpleCollection())).should.throw('Collection is empty');
  });
});
