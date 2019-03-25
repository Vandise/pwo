import * as dom from '../../../util/dom';

class ProgressBar extends dom.globals.me.Renderable {

  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.invalidate = false;
    this.progress = 0;
    this.anchorPoint.set(0, 0);

    this.floating = true;
    this.file = null;
    this.text = new dom.globals.me.Text(40, 376.5, {
      font: 'Arial',
      size: '10px',
      text: 'Connecting to server...',
      fillStyle: 'white'
    });

    me.game.world.addChild(this.text, 3)
  }

  onProgressUpdate(progress, file) {
    this.progress = ~~(progress * this.width);
    this.invalidate = true;
    this.file = file;
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

    if (this.file) {
      this.text.setText(`Loading: ${this.file.src}`);
    }

    renderer.setColor("black");
    renderer.fillRect(this.pos.x, height / 2, this.width, this.height / 2);
    renderer.setColor("#55aa00");
    renderer.fillRect(this.pos.x, height / 2, this.progress, this.height / 2);
    renderer.setColor(color);

  }
}

export default ProgressBar;