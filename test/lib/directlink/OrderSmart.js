'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const OrderSmart = require(path.join(DIR_SRC, 'OrderSmart')),
  HttpResponse = require(path.join(DIR_SRC, '../request', 'HttpResponse'));

describe('DirectlinkOrderSmart', () => {
  it('generate a tokenize link', done => {
    const obj = {
      'card.paymentmethod': 'CreditCard',
      'parameters.accepturl': 'http://ya.ru/succ',
      'parameters.exceptionurl': 'http://ya.ru/err',
      'account.pspid': 'test'
    };

    const order1 = OrderSmart.test('f8p8NRVhPt6CjnrK', obj);
    order1.toJson().then(response => {
      console.log(response);
      done();
    })

      .catch(e => console.log(e));
  });
});