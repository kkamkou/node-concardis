'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const QueryArgument = require(path.join(DIR_SRC, 'Argument')),
  QuerySimpleCollection = require(path.join(DIR_SRC, 'SimpleCollection'));

describe('RequestDefaultCollection', () => {
  it('constructor type check', () => {
    (() => new QuerySimpleCollection([new Date()])).should.throw(TypeError);
  });

  it('expose functionality', () => {
    const arg1 = new QueryArgument('QA_NAME1', 'QA_VALUE1'),
      arg2 = new QueryArgument('QA_NAME2', 'QA_VALUE2'),
      collection = new QuerySimpleCollection([arg1, arg2]);
    collection.toArray().should.containEql('QA_NAME1=QA_VALUE1').and.have.length(2);
    collection.has('invalid').should.be.false();
    collection.has('QA_NAME1').should.be.true();
    collection.toUrn().should.equal('QA_NAME1=QA_VALUE1&QA_NAME2=QA_VALUE2');
  });
});