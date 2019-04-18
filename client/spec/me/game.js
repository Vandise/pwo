module.exports = {
  world: {
    addChild: sinon.spy(),
    removeChild: sinon.spy()
  },
  viewport: {
    follow: sinon.spy(),
    AXIS: { BOTH: 1 }
  }
};