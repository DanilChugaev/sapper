import { DrawingContext, DrawingContextProvider } from '../context/types';
import { SourceInterface } from '../source/types';
import { MAIN_BG_COLOR, INITIAL_FIELD_BG_COLOR, TEXT_COLOR, FLAG_BG_COLOR, BORDER_COLOR } from './constants';
import { DrawerInterface } from './types';

/** Class implements painting on canvas */
export class DrawerClass implements DrawerInterface {
  /** Canvas 2d context */
  private context: DrawingContext = null;

  /** Bomb image */
  private bomb: CanvasImageSource;

  /** Flag image */
  private flag: CanvasImageSource;

  /**
   * @param contextProvider - provides the context of the canvas
   * @param sourceInstance - to interact with the file system
   */
  constructor(
    private contextProvider: DrawingContextProvider,
    private sourceInstance: SourceInterface,
  ) {
    this.context = this.contextProvider.getInstance();
    if (!this.context) {
      throw new Error('Failed to access the drawing context.');
    }

    this.bomb = this.sourceInstance.getImage('bomb');
    this.flag = this.sourceInstance.getImage('flag');
  }

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
  public drawSquare({ x, y }: Cell, size: PixelsAmount, color: string, hasBorders = true): void {
    if (!this.context) {
      return;
    }

    this.context.fillStyle = color;
    this.context.fillRect(x, y, size, size);

    if (hasBorders) {
      this.drawBorders({ x, y }, size);
    }
  }

  /**
   * Draws square with number
   *
   * @param cell - game board cell
   * @param cell.x - cell x coordinate
   * @param cell.y - cell y coordinate
   * @param size - square size in pixels
   * @param value - number to draw
   */
  public drawNumber({ x, y }: Cell, size: PixelsAmount, value: number): void {
    this.drawSquare({ x, y }, size, MAIN_BG_COLOR);

    /** font size should be less than the size of the square */
    this.context.font = `${size / 2}px Arial`;
    this.context.fillStyle = TEXT_COLOR;

    /** since the number is stretched upwards, for centering, we divide the width by a larger number than the height */
    this.context.fillText(value.toString(), x + (size / 2.5), y + (size / 1.5));
  }

  /**
   * Draws square with bomb
   *
   * @param cell - game board cell
   * @param cell.x - cell x coordinate
   * @param cell.y - cell y coordinate
   * @param size - square size in pixels
   */
  public drawBomb({ x, y }: Cell, size: PixelsAmount): void {
    this.drawSquare({ x, y }, size, INITIAL_FIELD_BG_COLOR, false);

    const imageSize: number = this.getImageSize(size);

    this.context.drawImage(this.bomb, this.getImageCoord(x, size), this.getImageCoord(y, size), imageSize, imageSize);
  }

  /**
   * Draws square with flag
   *
   * @param cell - game board cell
   * @param cell.x - cell x coordinate
   * @param cell.y - cell y coordinate
   * @param size - square size in pixels
   */
  public drawFlag({ x, y }: Cell, size: PixelsAmount): void {
    this.drawSquare({ x, y }, size, FLAG_BG_COLOR, false);

    const imageSize: number = this.getImageSize(size);

    this.context.drawImage(this.flag, this.getImageCoord(x, size), this.getImageCoord(y, size), imageSize, imageSize);
  }

  /**
   * Calculates the size of the image squared
   *
   * @param size - square size in pixels
   */
  private getImageSize(size: number): number {
    return size / 2;
  }

  /**
   * Returns coordinate of image in the cell
   *
   * @param cellCoord - x or y coordinate of cell
   * @param size - square size in pixels
   */
  private getImageCoord(cellCoord: number, size: number): number {
    return cellCoord + (size / 4);
  }

  /**
   * Draws borders for square
   *
   * @param cell - game board cell
   * @param cell.x - cell x coordinate
   * @param cell.y - cell y coordinate
   * @param size - square size in pixels
   */
  private drawBorders({ x, y }: Cell, size: PixelsAmount): void {
    this.context.strokeStyle = BORDER_COLOR;
    this.context.strokeRect(x, y, size, size);
  }
}
