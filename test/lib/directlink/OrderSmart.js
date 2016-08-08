'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const OrderSmart = require(path.join(DIR_SRC, 'OrderSmart')),
  HttpResponse = require(path.join(DIR_SRC, '../request', 'HttpResponse'));

describe('DirectlinkOrderSmart', () => {
  it('generate a tokenize link', () => {
    const result = {
        orderID: '1234567890',
        PAYID: '0',
        NCERROR: '50001111',
        STATUS: '0'
      },
      payload = {
        alias: 'FE521799-50BB-47E6-AA10-B7B15CB3A0CC',
        amount: 7700,
        currency: 'EUR',
        cvc: '123', // or eci: 2/9
        operation: 'SAL',
        orderid: '1234567890',
        pspid: 'MyPspid',
        pswd: 'MyApiUserPassword',
        userid: 'My-API-User'
      };
    return OrderSmart.test('MyShaToken', payload).toJson().should.be.fulfilledWith(result)
  });
});
