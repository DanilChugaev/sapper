import { ElementSource } from './types';

/** Class allows interact with the DOM tree */
export class DomSource implements ElementSource {
  /**
   * @param window - window containing a DOM document
   */
  constructor(private window: Window) {}

  /**
   * Create HTML element
   *
   * @param name - name of HTML element
   */
  public createElement(name: string): Nullable<HTMLElement> {
    return this.window.document.createElement(name);
  }

  /**
   * Returns HTML element by ID
   *
   * @param id - ID of HTML element
   */
  public getElement(id: string): Nullable<HTMLElement> {
    return this.window.document.getElementById(id);
  }

  /**
   * Calls a callback after loading the DOM tree
   *
   * @param callback - function that is called after loading the DOM tree
   */
  public afterLoad(callback: (event: Event) => void): void {
    this.window.document.addEventListener('DOMContentLoaded', (event: Event) => {
      callback(event);
    });
  }
}
