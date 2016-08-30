'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path'),
  sinon = require('sinon');

const Footer = require(path.join(DIR_SRC, 'Footer')),
  Envelope = require(path.join(DIR_SRC, 'Envelope')),
  LoginHeader = require(path.join(DIR_SRC, 'LoginHeader'));

describe('FormatEnvelope', () => {
  it('thrown in case of invalid params', () => {
    const stubHeader = sinon.createStubInstance(LoginHeader),
      stubFooter = sinon.createStubInstance(Footer);
    (() => new Envelope(new Date())).should.throw(TypeError);
    (() => new Envelope(stubHeader, new Date())).should.throw(TypeError);
    (() => new Envelope(stubHeader, stubFooter)).should.throw(TypeError);
    (() => new Envelope(stubHeader, stubFooter, [new Date()])).should.throw(TypeError);
  });

  it('expose functionality', () => {
    const header = new LoginHeader('3214', 'myPassword', 'test', 'MGID'),
      envelope = new Envelope(header, new Footer(), []);
    envelope.toString().should.equal(['OHL;3214;myPassword;MGID;test', null, 'OTF;'].join('\r\n'));
  });
});
