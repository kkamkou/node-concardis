'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const QueryArgument = require(path.join(DIR_SRC, 'Argument'));

describe('RequestQueryArgument', () => {
  it('expose functionality', () => {
    const arg = new QueryArgument('QA_NAME', 'QA_VALUE');
    arg.toString().should.equal('QA_NAME=QA_VALUE');
  });
});