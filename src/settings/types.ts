/** Уровень сложности игры */
export type Complexity = {
    /** Number of level bombs */
    bombCount: number,

    /** Size of the field in cells */
    fieldSize: CellAmount,

    /** If level is selected */
    selected: boolean,
};

/** List of possible levels of difficulty of the game */
export type ComplexityList = {
    beginner: Complexity,
    easy: Complexity,
    medium: Complexity,
    hard: Complexity,
    huge: Complexity,
    extreme: Complexity,
};

/** Basic game settings */
export type GameSettings = {
    canvasSize: PixelsAmount;
    devicePixelRatio: number;
    levels: ComplexityList;
};
