/** Настройки кисти */
export type BrushSettings = {
    color?: Color;
    width?: PixelsAmount;
};

export interface Drawer {
    drawLine(line: Line, settings?: BrushSettings): void;
    drawSquare(cell: Cell, size: Size, color?: string): void;
    drawNumber(cell: Cell, size: Size, value: number): void;
    drawBomb(cell: Cell, size: Size): void;
}
  