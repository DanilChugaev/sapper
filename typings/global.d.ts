/** Number of cells of the playing field */
type CellAmount = number;
/** Number of pixels */
type PixelsAmount = number;

/** Coordinate on the playing field */
type FieldCoordinate = number;
type PixelCoordinate = number;

/** Game board cell */
type Cell = {
    x: FieldCoordinate;
    y: FieldCoordinate;
    area?: any; // todo: fix type
    hasBomb?: boolean;
    hasFlag?: boolean;
    isOpen?: boolean;
    value?: number;
};

/** Positions of bombs on the field */
type BombPositions = number[];

/** Any */
type HexadecimalColor = string;
type Color = HexadecimalColor;
type Nullable<T> = T | null;