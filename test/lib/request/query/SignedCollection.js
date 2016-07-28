'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const QueryArgument = require(path.join(DIR_SRC, 'Argument')),
  QuerySignedCollection = require(path.join(DIR_SRC, 'SignedCollection'));

describe('RequestSignedCollection', () => {
  it('constructor type check', () => {
    (() => new QuerySignedCollection()).should.throw(Error);
    (() => new QuerySignedCollection('', '', [new Date()])).should.throw(TypeError);
  });

  it('expose functionality', () => {
    const arg1 = new QueryArgument('PARAMETERS.ACCEPTURL', 'https://example.com'),
      arg2 = new QueryArgument('ACCOUNT.PSPID', 'test'),
      sha1 = 'E250E47E5E14AF03CD6917FD28A72398798879D727410849C07D4120CF897E77',
      sha2 = '342E77988042E23588B550FC49F8916853AC58C2348F5098736F2BAC0064DC0950D841667467F4C' +
        '2920A8EE09B74B39E9D84D4E94482D5D5F90943003D41C6A2';

    const collection1 = new QuerySignedCollection('pwd', 'sign', [arg1, arg2]),
      collection2 = new QuerySignedCollection('pwd', 'sign', [arg1, arg2], 'sha512');

    collection1.toUrn().should.equal([arg2.toString(), arg1.toString(), 'SIGN=' + sha1].join('&'));
    collection2.toUrn().should.equal([arg2.toString(), arg1.toString(), 'SIGN=' + sha2].join('&'));
  });
});