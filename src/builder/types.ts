import { GameSettings } from '../settings/types';

/** Structure of the field of the selected level of difficulty */
export type MapStructure = {
    pixelsCountInCell: number,
    bombCount: number,
    bombLeft: number,
    usedCells: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cells: any, // todo: fix type
    bombPositions: BombPositions,
    fieldSize: number,
};

/** Responsible for creating levels */
export interface BuilderInterface {
    /**
     * Build level
     *
     * @param settings - basic game settings
     */
    build(settings: GameSettings): MapStructure;
}

/** Neighboring cells relative to the center cell */
export type AreaStructure = {
    0?: Cell,
    1?: Cell,
    2?: Cell,
    3?: Cell,
    4?: Cell,
    5?: Cell,
    6?: Cell,
    7?: Cell,
};
