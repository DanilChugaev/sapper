import { AreaStructure } from './types';

/**
 * Coordinates of neighboring cells relative to the center cell
 *
 * @example
 *  #0#1#2#
 *  #7-8-3#
 *  #6#5#4#
 */
export const AREA_STRUCTURE: AreaStructure = {
  0: { x: -1, y: -1 },
  1: { x:  0, y: -1 },
  2: { x:  1, y: -1 },
  3: { x:  1, y:  0 },
  4: { x:  1, y:  1 },
  5: { x:  0, y:  1 },
  6: { x: -1, y:  1 },
  7: { x: -1, y:  0 },
};
