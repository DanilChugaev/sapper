import { ElementSource } from "../dom/types";
import { GameSettings } from "../settings/types";
import { DrawingContext, DrawingContextProvider } from "./types";

export class CanvasContextProvider implements DrawingContextProvider {
    private canvas: Nullable<HTMLCanvasElement> = null;
    private context: Nullable<DrawingContext> = null;
  
    constructor(
      private elementSource: ElementSource,
      private settings: GameSettings
    ) {
      const canvas = this.elementSource.getElement("canvas");
      if (!canvas) throw new Error("Failed to find a canvas.");
  
      this.canvas = canvas as HTMLCanvasElement;
      this.context = this.canvas.getContext("2d");
      this.normalizeScale();
    }
  
    public getInstance(): DrawingContext {
      return this.context;
    }

    public listenCanvasClick(callback: Function): void {
      // @ts-ignore
      this.canvas.addEventListener("click", callback);
    }

    public listenCanvasContextMenu(callback: Function): void {
      // @ts-ignore
      this.canvas.addEventListener("contextmenu", callback);
    }
  
    private normalizeScale(): void {
      if (!this.canvas || !this.context) return;
  
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