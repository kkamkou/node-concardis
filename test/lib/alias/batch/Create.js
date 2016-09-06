'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const Create = require(path.join(DIR_SRC, 'Create'));

describe('AliasBatchCreate', () => {
  it('expose functionality', () => {
    const instance = new Create(
      'Customer123', 'John Doe', '4111111111111111', 1017, 'VISA', 'test'
    );
    instance.toString()
      .should.equal('ADDALIAS;Customer123;John Doe;4111111111111111;1017;VISA;test');
  });
});
