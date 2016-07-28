'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const Argument = require(path.join(DIR_SRC, 'Argument')),
  SimpleCollection = require(path.join(DIR_SRC, 'SimpleCollection')),
  CollectionChecksum = require(path.join(DIR_SRC, 'CollectionChecksum')),
  SignedCollection = require(path.join(DIR_SRC, 'SignedCollection'));

describe('RequestSignedCollection', () => {
  it('constructor type check', () => {
    (() => new SignedCollection()).should.throw(Error);
    (() => new SignedCollection('', new Date())).should.throw(TypeError);
  });

  it('expose functionality', () => {
    const arg1 = new Argument('PARAMETERS.ACCEPTURL', 'https://example.com'),
      arg2 = new Argument('ACCOUNT.PSPID', 'test'),
      sha = 'E250E47E5E14AF03CD6917FD28A72398798879D727410849C07D4120CF897E77';

    const collection = new SimpleCollection([arg1, arg2]),
      checksum = new CollectionChecksum(collection, 'pwd'),
      signed = new SignedCollection('sign', checksum, collection);

    signed.toUrn().should.equal([arg2.toString(), arg1.toString(), 'SIGN=' + sha].join('&'));
  });
});