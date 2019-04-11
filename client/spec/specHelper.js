global.React = require('react');
global.ReactDOM = require('react-dom');

var chai = require('chai');
chai.use(require('sinon-chai'));
chai.use(require('chai-immutable'));

global.sinon = require('sinon');
global.expect = chai.expect;

global.window = {
  me: require('./me'),
  onReady: sinon.spy(),
};

global.me = require('./me');

global.document = {
  location: {
    hash: ''
  }
};