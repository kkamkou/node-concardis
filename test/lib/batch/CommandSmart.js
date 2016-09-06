'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const CommandSmart = require(path.join(DIR_SRC, 'CommandSmart')),
  EnvelopeSmart = require(path.join(DIR_SRC, '../alias/batch', 'EnvelopeSmart'));

describe('BatchCommandSmart', () => {
  const message = EnvelopeSmart
    .header('MyUser', 'My-API-User', '123123')
    .create([['Customer123', 'John Doe', '4111111111111111', 1017, 'VISA', 'test']])
    .toString();

  it('be converted to json', done => {
    CommandSmart.test().check(message).toJson()
      .then(response => {
        response.NCERROR[0].should.equal('50001111');
        done();
      });
  });

  it('be converted to string', done => {
    CommandSmart.test().check(message).toString()
      .then(response => {
        response.should.containEql('AFU_REPLY');
        done();
      });
  });
});
