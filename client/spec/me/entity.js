var Renderable = require('./renderable');

var Entity = function(x, y, settings) {
  this.settings = settings;
  this.pos = {
    x: x,
    y: y
  };

  this.body = {
    vel: { x: 0, y: 0 },
    setVelocity: sinon.spy(),
    setFriction: sinon.spy(),
    update: sinon.spy()
  };

  this.renderable = new Renderable(x, y, settings);
  this.anchorPoint = this.renderable.anchorPoint;
};

Entity.prototype.update = function(dt) {

}

module.exports = Entity;