'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path'),
  sinon = require('sinon');

const Envelope = require(path.join(DIR_SRC, 'Envelope')),
  LoginHeader = require(path.join(DIR_SRC, 'LoginHeader')),
  BatchSmart = require(path.join(DIR_SRC, '../alias', 'BatchSmart'));

describe('FormatEnvelope', () => {
  it('thrown in case of invalid params', () => {
    const stubHeader = sinon.createStubInstance(LoginHeader);
    (() => new Envelope(new Date())).should.throw(TypeError);
    (() => new Envelope(stubHeader, new Date())).should.throw(TypeError);
    (() => new Envelope(stubHeader, [new Date()])).should.throw(TypeError);
  });

  it('expose functionality', () => {
    const header = new LoginHeader('3214', 'User ID', 'User Password', true),
      envelope = new Envelope(header, []);
    envelope.toString().should.equal(
      ['OHL;3214;User Password;MGID;User ID;', null, 'OTF;'].join('\r\n')
    );
  });

  it('communicate with the server', done => {
    BatchSmart
      .test('MyPspid', 'My-API-User', 'MyApiUserPassword'/*, true*/)
      .delete(['Customer123']).toJson()
      .then(response => {
        response.NCERROR.should.containEql('50001111');
        done();
      });
  });
});
