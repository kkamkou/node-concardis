'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const HttpPost = require(path.join(DIR_SRC, '../../request', 'HttpPost')),
  OrderValidHttpPost = require(path.join(DIR_SRC, 'OrderValidHttpPost')),
  ObjectCollection = require(path.join(DIR_SRC, '../../request', 'ObjectCollection'));

describe('DirectlinkOrderValidHttpPost', () => {
  const payloadWithAlias = {
    amount: 33300,
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

  it('validate incoming data without an amount', () => {
    const invalidPayloadWithoutAlias = Object.assign({}, payloadWithAlias);
    delete invalidPayloadWithoutAlias.amount;

    const request = new HttpPost('', new ObjectCollection(invalidPayloadWithoutAlias));
    (() => (new OrderValidHttpPost(request)).fetch())
      .should.throw('The "AMOUNT" param is required');
  });

  it('validate incoming data without payment id', () => {
    const invalidPayloadWithoutAlias = Object.assign({}, payloadWithAlias);
    delete invalidPayloadWithoutAlias.orderid;

    const request = new HttpPost('', new ObjectCollection(invalidPayloadWithoutAlias));
    (() => (new OrderValidHttpPost(request)).fetch())
      .should.throw('The "ORDERID" param is required');
  });

  it('validate incoming data with payment id and without order id', () => {
    const invalidPayloadWithoutAlias = Object.assign({}, payloadWithAlias);
    invalidPayloadWithoutAlias.payid = invalidPayloadWithoutAlias.orderid;
    delete invalidPayloadWithoutAlias.orderid;

    const request = new HttpPost('', new ObjectCollection(invalidPayloadWithoutAlias));
    (() => (new OrderValidHttpPost(request)).fetch()).should.not.throw;
  });
});
