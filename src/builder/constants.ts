import { AreaStructure } from "./types";

/**
 * Относительные координаты соседних ячеек области
 * 
 * #1#2#3#
 * #8-+-4#
 * #7#6#5#
 */
export const AREA_STRUCTURE: AreaStructure = {
    0: { x: -1, y: -1 },
    1: { x: 0, y: -1 },
    2: { x: 1, y: -1 },
    3: { x: 1, y: 0 },
    4: { x: 1, y: 1 },
    5: { x: 0, y: 1 },
    6: { x: -1, y: 1 },
    7: { x: -1, y: 0 },
}