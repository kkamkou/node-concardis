'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const QueryArgument = require(path.join(DIR_SRC, 'Argument')),
  QuerySignedCollection = require(path.join(DIR_SRC, 'SignedCollection'));

describe('RequestSignedCollection', () => {
  it('constructor type check', () => {
    (() => new QuerySignedCollection([new Date()])).should.throw(TypeError);
  });

  it('expose functionality', () => {
    const arg1 = new QueryArgument('PARAMETERS.ACCEPTURL', 'https://example.com'),
      arg2 = new QueryArgument('ACCOUNT.PSPID', 'test'),
      sha = 'BE08E2B2452E5E47938196714EC854BF55A0ADD8696167077BA30952F357B8B4',
      collection = new QuerySignedCollection('pwd', 'sign', [arg1, arg2]);
    collection.toUrn().should.equal([arg2.toString(), arg1.toString(), 'SIGN=' + sha].join('&'));
  });
});