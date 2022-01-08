import { ElementSource } from '../dom/types';
import { GameSettings } from '../settings/types';
import { DrawingContext, DrawingContextProvider } from './types';

/** Provides the context of the canvas */
export class CanvasContextProvider implements DrawingContextProvider {
  /** Game will be drawn on this canvas */
  private canvas: Nullable<HTMLCanvasElement> = null;

  /** Canvas 2d context */
  private context: Nullable<DrawingContext> = null;

  /**
   * @param elementSource - allows interact with the DOM tree
   * @param settings - basic game settings
   */
  constructor(
    private elementSource: ElementSource,
    private settings: GameSettings,
  ) {
    const canvas = this.elementSource.getElement('canvas');

    if (!canvas) {
      throw new Error('Failed to find a canvas.');
    }

    this.canvas = canvas as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    this.normalizeScale();
  }

  /** Returns canvas 2d context */
  public getInstance(): DrawingContext {
    return this.context;
  }

  /**
   * Listen to clicking on the canvas by left mouse button
   *
   * @param callback - a function that is called after clicking on the canvas by left mouse button
   */
  public listenCanvasClick(callback: () => void): void {
    this.canvas.addEventListener('click', callback);
  }

  /**
   * Listen to clicking on the canvas by right mouse button
   *
   * @param callback - a function that is called after clicking on the canvas by right mouse button
   */
  public listenCanvasContextMenu(callback: () => void): void {
    this.canvas.addEventListener('contextmenu', callback);
  }

  /** Normalize canvas styles and context scale */
  private normalizeScale(): void {
    if (!this.canvas || !this.context) {
      return;
    }

    const ratio = this.settings.devicePixelRatio || 1;
    const size: PixelsAmount = this.settings.canvasSize;

    this.canvas.width = size * ratio;
    this.canvas.height = size * ratio;

    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;

    this.context.imageSmoothingEnabled = false;
    this.context.scale(ratio, ratio);
  }
}
