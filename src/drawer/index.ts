import { DrawingContext, DrawingContextProvider } from "../context/types";
import { DEFAULT_COLOR, DEFAULT_WIDTH, MAIN_BG_COLOR, INITIAL_FIELD_BG_COLOR, TEXT_COLOR } from "./constants";
import { BrushSettings, Drawer } from "./types";

export class CanvasDrawer implements Drawer {
    private context: DrawingContext = null;
  
    constructor(
      private contextProvider: DrawingContextProvider
    ) {
      this.context = this.contextProvider.getInstance();
      if (!this.context) throw new Error("Failed to access the drawing context.");

      // this.bomb = sourceProvider.getImage('bomb');
      // this.flag = sourceProvider.getImage('flag');
    }
  
    public drawLine(
      { start, end }: Line,
      { color, width }: BrushSettings = {}
    ): void {
      if (!this.context) return;
  
      this.context.strokeStyle = color ?? DEFAULT_COLOR;
      this.context.lineWidth = width ?? DEFAULT_WIDTH;
  
      this.context.beginPath();
      this.context.moveTo(start.x, start.y);
      this.context.lineTo(end.x, end.y);
      this.context.stroke();
    }

    public drawSquare({ x, y }: Cell, { width, height }: Size, color?: string): void {
      if (!this.context) return;

      this.context.fillStyle = color ? color : INITIAL_FIELD_BG_COLOR;
      this.context.fillRect(x, y, width, height)
    }

    public drawNumber({ x, y }: Cell, { width, height }: Size, value: number): void {
      this.drawSquare({ x, y }, { width, height }, MAIN_BG_COLOR);
      // this.drawBorders({ x, y }, { width, height }, 'lightgrey')
      // нарисовать бордеры

      this.context.font = `${height / 2}px Arial`;
		  this.context.fillStyle = TEXT_COLOR;
      this.context.fillText(String(value), x + (width / 2.5), y + (height / 1.5))
    }

    public drawBomb({ x, y }: Cell, { width, height }: Size): void {

    }

    // private drawBorders({ x, y }: Cell, { width, height }: Size, color: string): void {
    //   this.drawLine({
    //     start: {
    //       x: x,
    //       y: y,
    //     },
    //     end: {
    //       x: x + width,
    //       y: y,
    //     },
    //   }, { color })
    // }
  }