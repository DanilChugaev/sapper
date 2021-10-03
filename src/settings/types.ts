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
    name: string;
    bombCount: number,
    fieldSize: Size,
    selected: Boolean,
};

/** Основные настройки игры */
export type GameSettings = {
    canvasSize: Size;
    levels: ComplexityList;
}