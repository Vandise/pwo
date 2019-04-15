import authentication from './authentication';
import mapData from './mapData';
import player from './player';

const actions = [
  authentication,
  mapData,
].concat(player);

export default actions;