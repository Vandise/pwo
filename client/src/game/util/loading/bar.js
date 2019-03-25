import * as dom from '../../../util/dom';

class ProgressBar extends dom.globals.me.Renderable {

  constructor(x, y, w, h) {
    super(x, y, w, h);
    this._super(me.Renderable, "init", [x, y, w, h]);

    this.invalidate = false;
    this.progress = 0;
    this.anchorPoint.set(0, 0);

    this.floating = true;
  }

  onProgressUpdate(progress) {
    this.progress = ~~(progress * this.width);
    this.invalidate = true;
  }

  update() {
    if (this.invalidate === true) {
      this.invalidate = false;
      return true;
    }
    return false;
  }

  draw(renderer) {
    const color = renderer.getColor();

    // get canvas height, not hardcoded 
    const height = 750;

    renderer.setColor("black");
    renderer.fillRect(this.pos.x, height / 2, this.width, this.height / 2);
    renderer.setColor("#55aa00");
    renderer.fillRect(this.pos.x, height / 2, this.progress, this.height / 2);
    renderer.setColor(color);

  }
}

export default ProgressBar;