'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const HttpResponse = require(path.join(DIR_SRC, 'HttpResponse'));

describe('RequestHttpResponse', () => {
  it('constructor type check', () => {
    const instance = new HttpResponse();
    (() => instance.toString()).should.throw('Please, re-define me');
    (() => instance.toJson()).should.throw('Please, re-define me');
  });
});
