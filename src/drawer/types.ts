export interface Drawer {
    drawSquare(cell: Cell, size: PixelsAmount, color?: string, hasBorders?: boolean): void;
    drawNumber(cell: Cell, size: PixelsAmount, value: number): void;
    drawBomb(cell: Cell, size: PixelsAmount): void;
    drawFlag(cell: Cell, size: PixelsAmount): void;
}
  