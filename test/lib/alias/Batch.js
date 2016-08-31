'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const Batch = require(path.join(DIR_SRC, 'Batch'));

describe('AliasBatch', () => {
  it('thrown in case of invalid params', () => {
    (() => new Batch(new Date())).should.throw('"HttpResponse" is expected');
  });
});
