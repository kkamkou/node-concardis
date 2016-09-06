'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const HttpResponsePlain = require(path.join(DIR_SRC, 'HttpResponsePlain'));

describe('RequestHttpResponsePlain', () => {
  it('expose functionality', () => {
    const body = '{"example": 3}',
      instance = new HttpResponsePlain(200, body);
    instance.code.should.equal(200);
    instance.toString().should.equal(body);
    instance.toJson().example.should.equal(3);
  });
});
