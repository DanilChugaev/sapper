import { DrawingContext, DrawingContextProvider } from "../context/types";
import { SourceProvider } from "../source/types";
import { MAIN_BG_COLOR, INITIAL_FIELD_BG_COLOR, TEXT_COLOR, FLAG_BG_COLOR, BORDER_COLOR } from "./constants";
import { Drawer } from "./types";

export class CanvasDrawer implements Drawer {
    private context: DrawingContext = null;
    private bomb: any;
    private flag: any;
  
    constructor(
      private contextProvider: DrawingContextProvider,
      private fileProvider: SourceProvider
    ) {
      this.context = this.contextProvider.getInstance();
      if (!this.context) throw new Error("Failed to access the drawing context.");

      this.bomb = fileProvider.getImage('bomb');
      this.flag = fileProvider.getImage('flag');
    }

    public drawSquare({ x, y }: Cell, size: PixelsAmount, color?: string, hasBorders: boolean = true): void {
      if (!this.context) return;

      this.context.fillStyle = color ? color : INITIAL_FIELD_BG_COLOR;
      this.context.fillRect(x, y, size, size);

      if (hasBorders) {
        this.drawBorders({ x, y }, size);
      }
    }

    public drawNumber({ x, y }: Cell, size: PixelsAmount, value: number): void {
      this.drawSquare({ x, y }, size, MAIN_BG_COLOR);

      this.context.font = `${size / 2}px Arial`;
		  this.context.fillStyle = TEXT_COLOR;
      this.context.fillText(String(value), x + (size / 2.5), y + (size / 1.5));
    }

    public drawBomb({ x, y }: Cell, size: PixelsAmount): void {
      this.drawSquare({ x, y }, size, INITIAL_FIELD_BG_COLOR, false);
      this.context.drawImage(this.bomb, x + (size / 4), y + (size / 4), size / 2, size / 2);
    }

    public drawFlag({ x, y }: Cell, size: PixelsAmount): void {
      this.drawSquare({ x, y }, size, FLAG_BG_COLOR, false);
      this.context.drawImage(this.flag, x + (size / 4), y + (size / 4), size / 2, size / 2);
    }

    private drawBorders({ x, y }: Cell, size: PixelsAmount): void {
      this.context.strokeStyle = BORDER_COLOR;
      this.context.strokeRect(x, y, size, size);
    }
  }