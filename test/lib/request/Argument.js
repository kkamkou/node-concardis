'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const QueryArgument = require(path.join(DIR_SRC, 'Argument'));

describe('RequestQueryArgument', () => {
  it('expose functionality', () => {
    const arg = new QueryArgument('QA_NAME', 'QA_VALUE');
    arg.toString().should.equal('QA_NAME=QA_VALUE');
  });

  it('compare by key with wrong type', () => {
    (() => (new QueryArgument('A', 'B')).compareTo(new Date())).should.throw(TypeError);
  });

  it('compare by key', () => {
    const arg1 = new QueryArgument('QA_NAME2', 'QA_VALUE'),
      arg2 = new QueryArgument('QA_NAME1', 'QA_VALUE');
    arg1.compareTo(arg2).should.be.equal(-1);
  });
});