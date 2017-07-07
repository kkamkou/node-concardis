'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const OrderSmart = require(path.join(DIR_SRC, 'OrderSmart')),
  HttpResponse = require(path.join(DIR_SRC, '../../request', 'HttpResponse'));

describe('DirectlinkOrderSmart', () => {
  const result = {
    orderID: '1234567890',
    PAYID: '',
    PAYIDSUB: '0',
    NCSTATUS: '5',
    NCERROR: '50001111',
    NCERRORPLUS: 'The data you entered is not correct. Please retry.',
    ACCEPTANCE: '',
    STATUS: '0',
    amount: '',
    currency: ''
  },
    payload = {
      amount: 7700,
      operation: 'RFD',
      orderid: '1234567890',
      pspid: 'MyPspid',
      pswd: 'MyApiUserPassword',
      userid: 'My-API-User'
    };

  it('reach the test destination', () => {
    return OrderSmart.test('MyShaToken', payload).toJson().should.be.fulfilledWith(result);
  });

  it('reach the production destination', () => {
    return OrderSmart.production('MyShaToken', payload).toJson().should.be.fulfilledWith(result);
  });
});
