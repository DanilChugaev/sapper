/** Настройки кисти */
export type BrushSettings = {
    color?: Color;
    width?: PixelsAmount;
};

export interface Drawer {
    drawSquare(cell: Cell, size: Size, color?: string, hasBorders?: boolean): void;
    drawNumber(cell: Cell, size: Size, value: number): void;
    drawBomb(cell: Cell, size: Size): void;
    drawFlag(cell: Cell, size: Size): void;
}
  