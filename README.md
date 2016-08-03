node-concardis
==============

Concardis payments in Node.js

[![Build Status](https://travis-ci.org/kkamkou/node-concardis.svg?branch=master)](https://travis-ci.org/kkamkou/node-concardis)
[![Coverage Status](https://coveralls.io/repos/github/kkamkou/node-concardis/badge.svg?branch=master)](https://coveralls.io/github/kkamkou/node-concardis?branch=master)
[![Dependency Status](https://www.versioneye.com/user/projects/5799df0ba9f08d0050d2ccae/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/5799df0ba9f08d0050d2ccae)

## Examples
```js
const concardis = require('concardis');
````

### Hosted tokenization page

To be able to use the Hosted Tokenization Page, you need to have at least one of the following options enabled:
  - One Page Checkout (option ID: OPC)
  - Alias Manager (option ID: REC1, REC2, RECX)

```js
const payload = {
  'account.pspid': 'MyPspid',
  'card.paymentmethod': 'CreditCard',
  'parameters.accepturl': 'http://ya.ru/succ',
  'parameters.exceptionurl': 'http://ya.ru/err'
};

const url = concardis.hosted.UrlSmart.production('MyShaToken', payload);
// or concardis.hosted.UrlSmart.test('myshatoken', payload, 'sha512')

console.log(url.toString());
```

### SHA signature
  - SHA-256 (is used by default in `request.CollectionChecksum`)

```js
const checksum = new concardis.request.CollectionChecksum(
    new concardis.request.ObjectCollection({'pspid': 'example'}), 'sha_phrase'/*, 'sha512'*/
);
console.log(checksum.toString());
```

### DirectLink (server-to-server)

#### Request a new order

```js
const payload = {
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

concardis.directlink.OrderSmart
  .test('MyShaToken', payload).toJson()
  .then(response => console.log(response))
  .catch(error => console.error(error))
```

## Docs
- [hosted-tokenization-page](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/eee5a544-7860-4428-9956-150d1a64805f/hosted-tokenization-page.ashx)
- [alias-gateway](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/b5e53b03-49ff-4152-8df0-c14a02c1fdba/alias-gateway.ashx)
- [e-commerce](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/123ae0b9-2864-48d4-9b06-7ed2d70db029/e-commerce.ashx)
- [directlink](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/5fb19037-3393-4cea-bace-1fd21718119f/directlink.ashx)

## License
The MIT License (MIT)

Copyright (c) 2016 Kanstantsin Kamkou
