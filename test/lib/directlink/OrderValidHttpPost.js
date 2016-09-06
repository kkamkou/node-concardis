'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const HttpPost = require(path.join(DIR_SRC, '../request', 'HttpPost')),
  OrderValidHttpPost = require(path.join(DIR_SRC, 'OrderValidHttpPost')),
  ObjectCollection = require(path.join(DIR_SRC, '../request', 'ObjectCollection'));

describe('DirectlinkOrderValidHttpPost', () => {
  const payloadWithAlias = {
    alias: 'FE521799-50BB-47E6-AA10-B7B15CB3A0CC',
    amount: 7700,
    currency: 'EUR',
    eci: 2,
    operation: 'SAL',
    orderid: '1234567890',
    pspid: 'MyPspid',
    pswd: 'MyApiUserPassword',
    userid: 'My-API-User',
    shasign: 'sign'
  };

  it('thrown in case of invalid params', () => {
    (() => new OrderValidHttpPost(new Date())).should.throw('"HttpPost" is expected');
  });

  it('validate incoming data with an alias', () => {
    const invalidPayloadWithAlias = Object.assign({}, payloadWithAlias);
    delete invalidPayloadWithAlias.shasign;

    const request = new HttpPost('', new ObjectCollection(invalidPayloadWithAlias));
    (() => (new OrderValidHttpPost(request)).fetch())
      .should.throw('The "SHASIGN" param is required');
  });

  it('validate incoming data without an alias', () => {
    const invalidPayloadWithoutAlias = Object.assign({}, payloadWithAlias);
    delete invalidPayloadWithoutAlias.alias;

    const request = new HttpPost('', new ObjectCollection(invalidPayloadWithoutAlias));
    (() => (new OrderValidHttpPost(request)).fetch())
      .should.throw('The "CARDNO" param is required');
  });
});
