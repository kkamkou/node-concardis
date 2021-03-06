node-concardis
==============

Concardis payments in Node.js

[![Build Status](https://travis-ci.org/kkamkou/node-concardis.svg?branch=master)](https://travis-ci.org/kkamkou/node-concardis)
[![Coverage Status](https://coveralls.io/repos/github/kkamkou/node-concardis/badge.svg?branch=master)](https://coveralls.io/github/kkamkou/node-concardis?branch=master)
[![Code Climate](https://codeclimate.com/github/kkamkou/node-concardis/badges/gpa.svg)](https://codeclimate.com/github/kkamkou/node-concardis)
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
  'account.pspid': 'MyPspId',
  'card.paymentmethod': 'CreditCard',
  'parameters.accepturl': 'http://ya.ru/succ',
  'parameters.exceptionurl': 'http://ya.ru/err'
};

const url = concardis.hosted.UrlSmart
  .test/*production*/('MyShaToken', payload/*, 'sha512'*/);

console.log(url.toString());
```

### SHA signature
  - SHA-256 (is used by default in `request.CollectionChecksum`)

```js
const checksum = new concardis.request.CollectionChecksum(
    new concardis.request.ObjectCollection({'pspid': 'example'}),
    'MyShaPhrase'
    /*, 'sha512'*/
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
  cvc: '123', // or eci: 2/9; 9 is for reccurring transactions
  operation: 'SAL',
  orderid: '1234567890',
  pspid: 'MyPspId',
  pswd: 'MyApiUserPassword',
  userid: 'My-API-User'
};

concardis.direct.link.OrderSmart
  .test/*production*/('MyShaToken', payload/*, 'sha512'*/).toJson()
  .then(response => console.log(response)) // NCERROR and NCSTATUS validation
  .catch(error => console.error(error))
```

### Bulk Alias management via Batch

#### Alias creation

```js
const alias = [
  'Customer123', 'John Doe', '4111111111111111', 1012, 'VISA', 'JDoeSHOP'
];

const message = concardis.alias.batch.EnvelopeSmart
  .header('MyPspId', 'My-API-User', 'MyApiUserPassword'/*, true*/) 
  .create([alias]).toString()

// two step process goes here, see the alias deletion section below 
```

#### Alias deletion

```js
const message = concardis.alias.batch.EnvelopeSmart
  .header('MyPspId', 'My-API-User', 'MyApiUserPassword'/*, true*/)
  .delete(['Customer123']).toString();
  
// step 1 (acquiring FILEID)
concardis.batch.CommandSmart.test/*production*/()
  .check(message).toJson()
  .then(response => {
    // NCERROR validation
    // example FILEID: response.FORMAT_CHECK[0].FILEID[0]
    console.log(JSON.stringify(response));
  }) 
  .catch(error => console.error(error))
  
// step 2
concardis.batch.CommandSmart.test/*production*/()
  .process('MyFileId').toJson()
  .then(response => {
    // NCERROR validation
    // response.PROCESSING validation 
    console.log(JSON.stringify(response));
  }) 
  .catch(error => console.error(error))
```

## Docs
- [Alias Gateway](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/b5e53b03-49ff-4152-8df0-c14a02c1fdba/alias-gateway.ashx)
- [Alias Manager (Tokenization)](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/59f4e9ae-2914-468b-8d22-84e8ea744086/alias.ashx)
- [DirectLink (server-to-server)](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/5fb19037-3393-4cea-bace-1fd21718119f/directlink.ashx)
- [e-Commerce](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/123ae0b9-2864-48d4-9b06-7ed2d70db029/e-commerce.ashx)
- [Hosted Tokenization Page](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/eee5a544-7860-4428-9956-150d1a64805f/hosted-tokenization-page.ashx)
- [Transaction Statuses and Errors](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/955815bf-4514-4d75-b683-21034ff5789b/statuses-and-errors.ashx)
- [Upload/download files with Batch (advanced)](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/3fe4210b-97e3-47fd-b7c9-95d4b385f10f/batch.ashx)

## Tests
```
npm install && npm run cover
```

## License
The MIT License (MIT)

Copyright (c) 2016-2017 Kanstantsin Kamkou
