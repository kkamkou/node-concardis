'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const HttpResponseXml = require(path.join(DIR_SRC, 'HttpResponseXml'))

describe('RequestHttpResponseXml', () => {
  it('constructor type check', () => {
    (() => new HttpResponseXml(new Date())).should.throw('"Http" request is expected');
  });
});
