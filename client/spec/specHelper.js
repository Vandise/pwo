global.React = require('react');
//global.ReactDOM = require('react-dom');

var chai = require('chai');
chai.use(require('sinon-chai'));
chai.use(require('chai-immutable'));

global.sinon = require('sinon');
global.expect = chai.expect;

global.td = require('testdouble');

global.document = {
  location: {
    hash: ''
  }
};

global.me = require('./me');

//
// react helpers
//
var jsdom = require('jsdom');
var exposedProperties = ['window', 'navigator', 'document'];
var dom = new jsdom.JSDOM('<div id="ui"></div>', {
  url: "http://localhost"
});

global.document = dom.window.document;
global.window = document.defaultView;

global.window['onReady'] = sinon.spy();

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});



global.spyOnComponentMethod = (component, method, spy) => {
  component.instance()[method] = spy;
  component.update();
};