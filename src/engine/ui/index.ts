import { CustomProperties, DomInterface } from '../dom/types';
import { UIInterface } from './types';

/** Class to control the colors in the game */
export class UIClass implements UIInterface {
  /** Variables from `:root` declaration */
  private customProperties: CustomProperties;

  /** Color variables from custom properties */
  private colors: CustomProperties = {};

  /**
   * @param domInstance - allows interact with the DOM tree
   */
  constructor(domInstance: DomInterface) {
    this.customProperties = domInstance.getCustomProperties();

    for (const key in this.customProperties) {
      if (key.indexOf('COLOR') >= 0) {
        this.colors[key] = this.customProperties[key];
      }
    }

    // сделать только для режима разработки
    console.log(this.colors);
  }

  /**
   * Returns color variables from custom properties
   */
  public get getColor(): CustomProperties {
    return this.colors;
  }
}