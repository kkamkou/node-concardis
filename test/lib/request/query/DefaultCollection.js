'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const QueryArgument = require(path.join(DIR_SRC, 'Argument')),
  QueryDefaultCollection = require(path.join(DIR_SRC, 'DefaultCollection'));

describe('RequestDefaultCollection', () => {
  it('constructor type check', () => {
    (() => new QueryDefaultCollection([new Date()])).should.throw(TypeError);
  });

  it('expose functionality', () => {
    const arg1 = new QueryArgument('QA_NAME1', 'QA_VALUE1'),
      arg2 = new QueryArgument('QA_NAME2', 'QA_VALUE2'),
      collection = new QueryDefaultCollection([arg1, arg2]);
    collection.toArray().should.containEql('QA_NAME1=QA_VALUE1').and.have.length(2);
    collection.toUrn().should.equal('QA_NAME1=QA_VALUE1&QA_NAME2=QA_VALUE2');
  });
});