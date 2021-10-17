/** Настройки кисти */
export type BrushSettings = {
    color?: Color;
    width?: PixelsAmount;
};

export interface Drawer {
    drawLine(line: Line, settings?: BrushSettings): void;
    drawSquare(cell: Cell, size: Size): void;
}
  