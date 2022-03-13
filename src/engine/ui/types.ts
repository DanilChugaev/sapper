import { CustomProperties } from '../dom/types';

export interface UIInterface {
  /**
   * Returns color variables from custom properties
   */
  get getColor(): CustomProperties;
}