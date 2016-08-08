'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const Order = require(path.join(DIR_SRC, 'Order'));

describe('DirectlinkOrder', () => {
  it('thrown in case of invalid params', () => {
    (() => new Order(new Date())).should.throw(TypeError);
  });
});
