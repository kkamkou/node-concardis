'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const Http = require(path.join(DIR_SRC, 'Http'))

describe('RequestHttp', () => {
  it('constructor type check', () => {
    const instance = new Http();
    (() => instance.fetch()).should.throw('Please, re-define me');
    (() => instance.has('test')).should.throw('Please, re-define me');
  });
});
