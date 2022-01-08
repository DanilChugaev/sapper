import { GameSettings } from './types';
import { levels } from './levels';

/** Basic game settings */
export const settings: GameSettings = {
  /** Size of the field in pixels */
  canvasSize: 800,

  /** The ratio of the display resolution of the current device in physical pixels to the resolution in logical (CSS) pixels */
  devicePixelRatio: 1,

  /** List of game difficulty levels */
  levels,
};
