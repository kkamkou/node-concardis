'use strict';

const DIR_SRC = __dirname.replace('/test', '');

const path = require('path'),
  sinon = require('sinon');

const HttpPost = require(path.join(DIR_SRC, 'HttpPost')),
  ObjectCollection = require(path.join(DIR_SRC, 'ObjectCollection')),
  HttpResponsePlain = require(path.join(DIR_SRC, 'HttpResponsePlain'));

describe('RequestHttpPost', () => {
  it('expose functionality', () => {
    const instance = new HttpPost('', new ObjectCollection({theKey: 'theValue'}));
    instance.has('test').should.be.false();
    instance.has('theKey').should.be.true();
    instance._request.should.be.eql(require('request'));
  });

  it('constructor type check', () => {
    (() => new HttpPost('', new Date())).should.throw(TypeError);
  });

  it('submit correct request', done => {
    const instance = new HttpPost('http://ya.ru', new ObjectCollection({theKey: 'theValue'})),
      request = sinon.stub();

    sinon.stub(instance, '_request').get(() => request);

    request.yields(null, {statusCode: 200}, 'got it');

    instance.fetch()
      .then(result => {
        result.should.be.instanceOf(HttpResponsePlain);
        result.code.should.equal(200);
        result.toString().should.equal('got it');
        request.withArgs(instance._config).calledOnce.should.be.true();
        done();
      });
  });

  it('submit incorrect request', done => {
    const instance = new HttpPost('http://ya.ru', new ObjectCollection({theKey: 'theValue'})),
      request = sinon.stub();

    sinon.stub(instance, '_request').get(() => request);

    request.yields(new Error('failed'));

    instance.fetch()
      .catch(err => {
        err.message.should.equal('failed');
        done();
      });
  });
});
