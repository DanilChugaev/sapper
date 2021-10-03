import { ElementSource } from "./types";

export class DomSource implements ElementSource {
  constructor(private window: Window) {}

  public createElement(name: string): Nullable<HTMLElement> {
    return this.window.document.createElement(name);
  }

  public getElement(id: string): Nullable<HTMLElement> {
    return this.window.document.getElementById(id);
  }

  public afterLoad(callback: Function): void {
    this.window.document.addEventListener("DOMContentLoaded", function(event) {
      callback(event);
    });
  }
}