import { CustomProperties } from '../dom/types';

export interface ColorInterface {
  /**
   * Returns color variables from custom properties
   */
  get getColor(): CustomProperties;
}