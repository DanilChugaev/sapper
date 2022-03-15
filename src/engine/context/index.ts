import { DomInterface } from '../dom/types';
import { CanvasContext, ContextInterface } from './types';

/** Provides the context of the canvas */
export class ContextClass implements ContextInterface {
  /** Size of the field in pixels */
  private canvasSize: number;

  /** The ratio of the display resolution of the current device in physical pixels to the resolution in logical (CSS) pixels */
  private devicePixelRatio: number;

  /** Game will be drawn on this canvas */
  private canvas: Nullable<HTMLCanvasElement> = null;

  /** Canvas 2d context */
  private context: Nullable<CanvasContext> = null;

  /**
   * @param domInstance - allows interact with the DOM tree
   */
  constructor(
    private domInstance: DomInterface,
  ) {
    const canvas = this.domInstance.getElement('canvas');

    if (!canvas) {
      throw new Error('Failed to find a canvas.');
    }

    this.canvas = canvas as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
  }

  /**
   * Init context instance
   *
   * @param canvasSize - size of the field in pixels
   * @param devicePixelRatio - the ratio of the display resolution
   */
  public init(canvasSize: number, devicePixelRatio: number): void {
    this.canvasSize = canvasSize;
    this.devicePixelRatio = devicePixelRatio;

    this.normalizeScale();
  }

  /** Returns canvas 2d context */
  public getInstance(): CanvasContext {
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

    const ratio = this.devicePixelRatio || 1;
    const size: PixelsAmount = this.canvasSize;

    this.canvas.width = size * ratio;
    this.canvas.height = size * ratio;

    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;

    this.context.imageSmoothingEnabled = false;
    this.context.scale(ratio, ratio);
  }
}
