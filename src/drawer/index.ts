import { UIInterface, CustomProperties } from 'just-engine/src/ui/types';
import { CanvasContext, ContextInterface } from 'just-engine/src/context/types';
import { SourceInterface } from 'just-engine/src/source/types';

import { GameSettings } from '../settings/types';

import { DrawerInterface } from './types';


/** Class implements painting on canvas */
export class DrawerClass implements DrawerInterface {
  /** Canvas 2d context */
  private context: CanvasContext = null;

  /** Bomb image */
  private bomb: CanvasImageSource;

  /** Flag image */
  private flag: CanvasImageSource;

  /** Color variables from custom properties */
  private colors: CustomProperties;

  /**
   * @param contextInstance - provides the context of the canvas
   * @param sourceInstance - to interact with the file system
   * @param uiInstance - to control the UI in the game
   * @param settings - basic game settings
   */
  constructor(
    private contextInstance: ContextInterface,
    private sourceInstance: SourceInterface,
    private uiInstance: UIInterface,
    private settings: GameSettings,
  ) {
    this.contextInstance.init(this.settings.canvasSize, this.settings.devicePixelRatio);
    this.context = this.contextInstance.getInstance();

    if (!this.context) {
      throw new Error('Failed to access the drawing context.');
    }

    this.bomb = this.sourceInstance.getImage('bomb');
    this.flag = this.sourceInstance.getImage('flag');
    this.colors = this.uiInstance.getColors;
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
    this.drawSquare({ x, y }, size, this.colors.MAIN_BG_COLOR);

    /** font size should be less than the size of the square */
    this.context.font = `${size / 2}px ${this.uiInstance.getFont}`;
    this.context.fillStyle = this.colors.TEXT_COLOR;

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
    this.drawSquare({ x, y }, size, this.colors.FIELD_BG_COLOR, false);

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
    this.drawSquare({ x, y }, size, this.colors.FLAG_BG_COLOR, false);

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
    this.context.strokeStyle = this.colors.BORDER_COLOR;
    this.context.strokeRect(x, y, size, size);
  }
}
