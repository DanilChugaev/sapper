/** Список возможных уровней сложности игры */
export type ComplexityList = {
    beginner: Complexity,
    easy: Complexity,
    medium: Complexity,
    hard: Complexity,
    huge: Complexity,
    extreme: Complexity,
};

/** Уровень сложности игры */
export type Complexity = {
    bombCount: number,
    fieldSize: CellAmount,
    selected: Boolean,
};

/** Основные настройки игры */
export type GameSettings = {
    canvasSize: PixelsAmount;
    devicePixelRatio: number;
    levels: ComplexityList;
}