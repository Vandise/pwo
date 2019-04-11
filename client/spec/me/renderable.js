module.exports = function(x, y, w, h) {

  this.x = x;
  this.y = y;

  this.pos = {
    x: x,
    y: y
  };

  this.w = w;
  this.width = w;

  this.h = h;
  this.height = h;

  this.anchorPoint = {
    set: sinon.spy()
  };

  this.resize = sinon.spy();

  this.getWidth = function() { return this.width; };
  this.getHeight = function() { return this.height; };

  this.getColor = sinon.stub();
  this.setColor = sinon.spy();
  this.fillRect = sinon.spy();
};