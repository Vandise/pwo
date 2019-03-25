import * as dom from '../../../util/dom';

class MelonIcon extends dom.globals.me.Renderable {

  constructor(x, y) {
    super(x, y, 100, 85);

    this.iconCanvas = me.video.createCanvas(
        me.Math.nextPowerOfTwo(this.width),
        me.Math.nextPowerOfTwo(this.height),
    false);

    var context = me.video.renderer.getContext2d(this.iconCanvas);

    context.beginPath();
    context.moveTo(0.7, 48.9);
    context.bezierCurveTo(10.8, 68.9, 38.4, 75.8, 62.2, 64.5);
    context.bezierCurveTo(86.1, 53.1, 97.2, 27.7, 87.0, 7.7);
    context.lineTo(87.0, 7.7);
    context.bezierCurveTo(89.9, 15.4, 73.9, 30.2, 50.5, 41.4);
    context.bezierCurveTo(27.1, 52.5, 5.2, 55.8, 0.7, 48.9);
    context.lineTo(0.7, 48.9);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    context.beginPath();
    context.moveTo(84.0, 7.0);
    context.bezierCurveTo(87.6, 14.7, 72.5, 30.2, 50.2, 41.6);
    context.bezierCurveTo(27.9, 53.0, 6.9, 55.9, 3.2, 48.2);
    context.bezierCurveTo(-0.5, 40.4, 14.6, 24.9, 36.9, 13.5);
    context.bezierCurveTo(59.2, 2.2, 80.3, -0.8, 84.0, 7.0);
    context.lineTo(84.0, 7.0);
    context.closePath();
    context.lineWidth = 5.3;
    context.strokeStyle = "rgb(255, 255, 255)";
    context.lineJoin = "miter";
    context.miterLimit = 4.0;
    context.stroke();

    this.anchorPoint.set(0.5, 0.5);

  }

  draw(renderer) {
    renderer.drawImage(this.iconCanvas, this.pos.x, this.pos.y);
  }
}

export default MelonIcon;