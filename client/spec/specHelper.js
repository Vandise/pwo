global.React = require('react');
global.ReactDOM = require('react-dom');

var chai = require('chai');
chai.use(require('sinon-chai'));
chai.use(require('chai-immutable'));

global.sinon = require('sinon');
global.expect = chai.expect;

global.td = require('testdouble');

global.window = {
  onReady: sinon.spy(),
};

global.document = {
  location: {
    hash: ''
  }
};

global.me = require('./me');