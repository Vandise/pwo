module.exports = function(w, h, settings) {
  this.w = w;
  this.h = h;
  this.settings = settings;
  this.setText = sinon.spy();
};