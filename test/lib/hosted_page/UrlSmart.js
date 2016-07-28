'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const UrlSmart = require(path.join(DIR_SRC, 'UrlSmart'));

describe('HostedPageUrlSmart', () => {
  it('generate a tokenize link', () => {
    const obj = {
        'card.paymentmethod': 'CreditCard',
        'parameters.accepturl': 'http://ya.ru/succ',
        'parameters.exceptionurl': 'http://ya.ru/err',
        'account.pspid': 'test'
      },
      arg = new UrlSmart('f8p8NRVhPt6CjnrK', obj);

    const result = 'https://payengine.test.v-psp.com/Tokenization/Hostedpage/' +
      '?ACCOUNT.PSPID=test&CARD.PAYMENTMETHOD=CreditCard&PARAMETERS.ACCEPTURL=http://ya.ru/succ' +
      '&PARAMETERS.EXCEPTIONURL=http://ya.ru/err' +
      '&SHASIGNATURE.SHASIGN=DE447683BE328B12BD00CD8A1F53790518F4CAF029EA65D8A7CB3D3DEB6B1EC1';

    arg.toString().should.equal(result);
  });
});