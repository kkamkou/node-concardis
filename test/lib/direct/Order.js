'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const Order = require(path.join(DIR_SRC, 'Order')),
  HttpResponsePlain = require(path.join(DIR_SRC, '../request', 'HttpResponsePlain'));

describe('DirectLinkOrder', () => {
  it('thrown in case of invalid params', () => {
    (() => new Order(new Date())).should.throw(TypeError);
  });

  it('expose functionality', () => {
    const body = '{"hello": 3}',
      response = new HttpResponsePlain(200, body),
      order = new Order(response);
    order.toString().should.equal(body);
  });
});
