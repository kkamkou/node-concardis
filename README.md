

## Docs
- [hosted-tokenization-page](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/eee5a544-7860-4428-9956-150d1a64805f/hosted-tokenization-page.ashx)
- [alias-gateway](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/b5e53b03-49ff-4152-8df0-c14a02c1fdba/alias-gateway.ashx)
- [e-commerce](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/123ae0b9-2864-48d4-9b06-7ed2d70db029/e-commerce.ashx)
- [directlink](https://support-payengine.v-psp.com/~/media/kdb/pdf/concardis/en/5fb19037-3393-4cea-bace-1fd21718119f/directlink.ashx)


## Sign
- SHA-256 (is used by default in `SignedCollection`)

## Examples

#### Hosted tokenization page
```js
/**
 * To be able to use the Hosted Tokenization Page, you need to have at least one of the following options enabled:
 *  - One Page Checkout (option ID: OPC)
 *  - Alias Manager (option ID: REC1, REC2, RECX)
 */

const conf = {
  'card.paymentmethod': 'CreditCard',
  'parameters.accepturl': 'http://ya.ru/succ',
  'parameters.exceptionurl': 'http://ya.ru/err',
  'account.pspid': 'myaccount'
};

console.log((new UrlSmart('myshatoken', conf)).toString());
console.log((new UrlSmart('myshatoken', conf, 'sha512')).toString());
```

```
// https://secure.payengine.de/ncol/prod/orderdirect.asp
// https://secure.payengine.de/ncol/prod/alias_gateway.asp
// https://secure.payengine.de/Tokenization/HostedPage
```