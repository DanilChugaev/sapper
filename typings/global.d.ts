/** --- Геометрия --- **/

/** Кол-во ячеек игрового поля */
type CellAmount = number;
/** Кол-во пикселей */
type PixelsAmount = number;

type Length = number;
/** Координата на игровом поле */
type FieldCoordinate = number;
type PixelCoordinate = number;

/** Ширина и высота некой сущности игрового поля */
type Size = {
    width: Length;
    height: Length;
};

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

/** Линия на канвасе */
type Line = {
    start: Point;
    end: Point;
};

/** --- Графика --- **/

type HexadecimalColor = string;
type Color = HexadecimalColor;

/** --- Всякое --- **/

type Nullable<T> = T | null;