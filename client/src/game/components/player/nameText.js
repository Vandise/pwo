import * as dom from 'Util/dom';

export default class PlayerNameText extends dom.globals.me.Renderable {

  constructor(w, h, player) {
    super(0, 0, w, h);

    this.player = player;

    this.text = new me.Text(0, -35, {
      font: 'century gothic',
      size: 15,
      fillStyle: 'white',
      textAlign: 'center',
      textBaseline: 'top',
      text: this.player.username
    });

    this.text.anchorPoint.set(0.0, 0.0);

    window.playerText = this.text;

    dom.globals.me.game.world.addChild(this.text, 1);
  }

  draw(context) {
    this.text.setText(this.player.username);
    this.text.draw(context);
  }
};