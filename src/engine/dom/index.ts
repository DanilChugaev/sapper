import { CustomProperties, DomInterface } from './types';

/** Class allows interact with the DOM tree */
export class DomClass implements DomInterface {
  /** An object that is a CSS declaration block, and exposes style information and various style-related methods and properties */
  private rootStyles: CSSStyleDeclaration;

  /** Variables from `:root` declaration */
  private customProperties: CustomProperties = null;

  /**
   * @param windowInstance - window containing a DOM document
   * @param arrayInstance - main Array object
   */
  constructor(
    private windowInstance: Window,
    private arrayInstance: ArrayConstructor,
  ) {
    this.rootStyles = this.windowInstance.getComputedStyle(this.windowInstance.document.documentElement);
  }

  /**
   * Create HTML element
   *
   * @param name - name of HTML element
   */
  public createElement(name: string): Nullable<HTMLElement> {
    return this.windowInstance.document.createElement(name);
  }

  /**
   * Returns HTML element by ID
   *
   * @param id - ID of HTML element
   */
  public getElement(id: string): Nullable<HTMLElement> {
    return this.windowInstance.document.getElementById(id);
  }

  /**
   * Returns custom properties from `:root` declaration
   */
  public getCustomProperties(): CustomProperties {
    if (this.customProperties) {
      return this.customProperties;
    }

    this.customProperties = {};

    const customPropertiesValues = this.arrayInstance.from(this.rootStyles).filter(style => style.indexOf('--') === 0);

    customPropertiesValues.forEach(prop => {
      // --custom-properties -> CUSTOM_PROPERTIES
      this.customProperties[
        prop.split('-')
          .filter(item => item.length !== 0)
          .map(item => item.toUpperCase())
          .join('_')] = this.rootStyles.getPropertyValue(prop);
    });

    return this.customProperties;
  }

  /**
   * Calls a callback after loading the DOM tree
   *
   * @param callback - function that is called after loading the DOM tree
   */
  public afterLoad(callback: (event: Event) => void): void {
    this.windowInstance.document.addEventListener('DOMContentLoaded', (event: Event) => {
      callback(event);
    });
  }
}
