import { UIInterface, CustomProperties } from './types';

/** Class to control the UI in the game */
export class UIClass implements UIInterface {
  /** An object that is a CSS declaration block, and exposes style information and various style-related methods and properties */
  private rootStyles: CSSStyleDeclaration;

  /** Variables from `:root` declaration */
  private customProperties: CustomProperties;

  /** Color variables from custom properties */
  private colors: CustomProperties = {};

  /** Main font in the game */
  private font = '';

  /**
   * @param windowInstance - window containing a DOM document
   * @param arrayInstance - main Array object
   */
  constructor(
    private windowInstance: Window,
    private arrayInstance: ArrayConstructor,
  ) {
    this.init();
  }

  /**
   * Returns custom properties from `:root` declaration
   */
  public get getCustomProperties(): CustomProperties {
    return this.customProperties;
  }

  /**
   * Returns color variables from custom properties
   */
  public get getColors(): CustomProperties {
    return this.colors;
  }

  /**
   * Get font family
   */
  public get getFont(): string {
    return this.font;
  }

  /**
   * Set properties
   */
  private init(): void {
    this.rootStyles = this.windowInstance.getComputedStyle(this.windowInstance.document.documentElement);

    this.setCustomProperties();
    this.setColors();
    this.setFont();
  }

  /**
   * Set custom properties from :root
   */
  private setCustomProperties(): void {
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
  }

  /**
   * Set colors from custom properties
   */
  private setColors(): void {
    for (const key in this.customProperties) {
      if (key.indexOf('COLOR') >= 0) {
        this.colors[key] = this.customProperties[key];
      }
    }

    // сделать только для режима разработки
    console.log(this.colors);
  }

  /**
   * Set font family from custom properties
   */
  private setFont(): void {
    if (this.customProperties['FONT_FAMILY']) {
      this.font = this.customProperties['FONT_FAMILY'];
    }
  }
}