'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const UrlSmart = require(path.join(DIR_SRC, 'UrlSmart'));

describe('HostedPageUrlSmart', () => {
  it('thrown in case some params are missing', () => {
    (() => UrlSmart.test('https://example.com', {key: 'val'})).should.throw(Error);
  });

  it('thrown in case some params are missing (variants)', () => {
    (() => UrlSmart.test('https://example.com', {
      'parameters.accepturl': 'val',
      'parameters.exceptionurl': 'val',
      'account.pspid': 'val',
      'shasignature.shasign': 'val'
    })).should.throw(Error);
  });

  it('generate a tokenize link', () => {
    const obj = {
        'card.paymentmethod': 'CreditCard',
        'parameters.accepturl': 'http://ya.ru/succ',
        'parameters.exceptionurl': 'http://ya.ru/err',
        'account.pspid': 'test'
      },
      arg1 = UrlSmart.test('f8p8NRVhPt6CjnrK', obj),
      arg2 = UrlSmart.production('f8p8NRVhPt6CjnrK', obj);

    const result = 'https://payengine.test.v-psp.com/Tokenization/Hostedpage/' +
      '?ACCOUNT.PSPID=test&CARD.PAYMENTMETHOD=CreditCard&PARAMETERS.ACCEPTURL=http://ya.ru/succ' +
      '&PARAMETERS.EXCEPTIONURL=http://ya.ru/err' +
      '&SHASIGNATURE.SHASIGN=DE447683BE328B12BD00CD8A1F53790518F4CAF029EA65D8A7CB3D3DEB6B1EC1';

    arg1.toString().should.equal(result);
    arg2.toString().should.equal(
      result.replace(
        'https://payengine.test.v-psp.com/Tokenization/Hostedpage/',
        'https://secure.payengine.de/Tokenization/HostedPage/'
      )
    );
  });
});
