/** --- Геометрия --- **/

/** Кол-во клеток игрового поля */
type CellAmount = number;
/** Кол-во пикселей */
type PixelsAmount = number;

/** Координата на игровом поле */
type FieldCoordinate = number;
type PixelCoordinate = number;

/** Ячейка игрового поля */
type Cell = {
    x: FieldCoordinate;
    y: FieldCoordinate;
};

/** Точка на канвасе */
type Point = {
    x: PixelCoordinate;
    y: PixelCoordinate;
};

/** --- Графика --- **/

type HexadecimalColor = string;
type Color = HexadecimalColor;

/** --- Всякое --- **/

type Nullable<T> = T | null;