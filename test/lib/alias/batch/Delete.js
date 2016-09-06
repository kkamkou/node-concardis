'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const Delete = require(path.join(DIR_SRC, 'Delete'));

describe('AliasBatchDelete', () => {
  it('expose functionality', () => {
    const instance = new Delete('Customer123');
    instance.toString().should.equal('DELALIAS;Customer123;;;;;');
  });
});
