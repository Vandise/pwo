var Text = function(w, h, settings) {
  this.w = w;
  this.h = h;
  this.settings = settings;
  this.setText = sinon.spy();
  this.anchorPoint = {
    set: sinon.spy()
  };
  this.setText = sinon.spy();
  this.draw = sinon.spy();
};

module.exports = Text;