import { globals } from 'Util/dom';

export const GS_HOST = 'localhost';
export const GS_PORT = 54500;
export const UI_MOUNT_ID = 'ui';

export const STATES = {
  LOGIN: globals.me.state.USER + 1,
  LOAD_WORLD: globals.me.state.USER + 2
};