'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const Command = require(path.join(DIR_SRC, 'Command'));

describe('BatchCommand', () => {
  it('thrown in case of invalid params', () => {
    (() => new Command(new Date())).should.throw('"HttpResponse" is expected');
  });
});
