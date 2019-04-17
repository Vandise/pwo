var Renderable = require('./renderable');

module.exports = function(x, y, settings) {
  this.settings = settings;
  this.pos = {
    x: x,
    y: y
  };

  this.body = {
    vel: { x: 0, y: 0 }
  };

  this.renderable = new Renderable(x, y, settings);
};