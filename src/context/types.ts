/** Канвас контекст */
export type DrawingContext = Nullable<CanvasRenderingContext2D>;

export interface DrawingContextProvider {
  getInstance(): DrawingContext;
  listenCanvasClick(callback: Function): void;
}