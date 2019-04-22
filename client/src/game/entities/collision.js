import * as dom from 'Util/dom';

const { me } = dom.globals;

export default {
  OBJECT: me.collision.types.USER << 0,
  NPC: me.collision.types.USER << 1,
  OTHER_PLAYER: me.collision.types.USER << 2
};