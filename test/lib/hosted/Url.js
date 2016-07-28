'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const Url = require(path.join(DIR_SRC, 'Url')),
  Argument = require(path.join(DIR_SRC, '../request', 'Argument')),
  Collection = require(path.join(DIR_SRC, '../request', 'SimpleCollection'));

describe('HostedPageUrl', () => {
  it('thrown in case of invalid params', () => {
    (() => new Url('https://example.com')).should.throw(TypeError);
  });

  it('thrown in case some params are missing', () => {
    const url = new Url('https://example.com', new Collection([new Argument('key', 'val')]));
    (() => url.toString()).should.throw(Error);
  });

  it('thrown in case some params are missing (variants)', () => {
    const args = [
        new Argument('parameters.accepturl', 'val'),
        new Argument('parameters.exceptionurl', 'val'),
        new Argument('account.pspid', 'val'),
        new Argument('shasignature.shasign', 'val')
      ],
      url = new Url('https://example.com', new Collection(args));

    (() => url.toString()).should.throw(Error);
  });

  it('converted to string', () => {
    const args = [
        new Argument('parameters.accepturl', 'val'),
        new Argument('parameters.exceptionurl', 'val'),
        new Argument('account.pspid', 'val'),
        new Argument('shasignature.shasign', 'val'),
        new Argument('card.paymentmethod', 'val')
      ],
      url = new Url('https://example.com', new Collection(args));

    url.toString().should.equal(
      'https://example.com/?ACCOUNT.PSPID=val&CARD.PAYMENTMETHOD=val&PARAMETERS.ACCEPTURL=val' +
      '&PARAMETERS.EXCEPTIONURL=val&SHASIGNATURE.SHASIGN=val'
    );
  });
});