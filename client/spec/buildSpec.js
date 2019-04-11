describe("the test suite", () => {
  it("is correctly instrumented", () => {
    const spy = sinon.spy();

    spy();

    expect(spy).to.have.been.called;
  });
});