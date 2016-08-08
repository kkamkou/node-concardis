'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const HttpResponse = require(path.join(DIR_SRC, 'HttpResponse'))

describe('RequestHttpResponse', () => {
  it('expose functionality', () => {
    const instance = new HttpResponse(200, 'example');
    instance.code.should.equal(200);
    instance.toString().should.equal('example');
  });
});
