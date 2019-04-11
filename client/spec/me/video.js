var Renderer = require('./renderable');

module.exports = {
  init: sinon.stub(),
  renderer: new Renderer(0, 0, 100, 100)
};