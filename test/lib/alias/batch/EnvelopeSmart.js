'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path');

const EnvelopeSmart = require(path.join(DIR_SRC, 'EnvelopeSmart'));

describe('AliasBatchEnvelopeSmart', () => {
  it('generate an alias delete message', () => {
    EnvelopeSmart
      .header('1', '2', '3', true)
      .delete(['testAccount1', 'testAccount2'])
      .toString()
      .should.equal(
        'OHL;1;3;MGID;2;\r\nDELALIAS;testAccount1;;;;;;\r\nDELALIAS;testAccount2;;;;;;\r\nOTF;'
      );
  });

  it('generate an alias create message', () => {
    EnvelopeSmart
      .header('1', '2', '3')
      .create([
        ['Customer123', 'John Doe', '4111111111111111', 1017, 'VISA', 'test'],
        ['Customer456', 'John Doe', '4222111111111111', 1018, 'VISA', 'test']
      ])
      .toString()
      .should.equal(
        'OHL;1;3;;2;\r\nADDALIAS;Customer123;John Doe;4111111111111111;1017;VISA;test;\r\n' +
        'ADDALIAS;Customer456;John Doe;4222111111111111;1018;VISA;test;\r\nOTF;'
      );
  });
});
