/** For painting on canvas */
export interface Drawer {
    /**
     * Draws an empty square
     *
     * @param cell - game board cell
     * @param cell.x - cell x coordinate
     * @param cell.y - cell y coordinate
     * @param size - square size in pixels
     * @param color - square color
     * @param hasBorders - whether to draw borders at a square
     */
    drawSquare(cell: Cell, size: PixelsAmount, color: string, hasBorders?: boolean): void;

    /**
     * Draws square with number
     *
     * @param cell - game board cell
     * @param cell.x - cell x coordinate
     * @param cell.y - cell y coordinate
     * @param size - square size in pixels
     * @param value - number to draw
     */
    drawNumber(cell: Cell, size: PixelsAmount, value: number): void;

    /**
     * Draws square with bomb
     *
     * @param cell - game board cell
     * @param cell.x - cell x coordinate
     * @param cell.y - cell y coordinate
     * @param size - square size in pixels
     */
    drawBomb(cell: Cell, size: PixelsAmount): void;

    /**
     * Draws square with flag
     *
     * @param cell - game board cell
     * @param cell.x - cell x coordinate
     * @param cell.y - cell y coordinate
     * @param size - square size in pixels
     */
    drawFlag(cell: Cell, size: PixelsAmount): void;
}
