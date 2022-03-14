export type CustomProperties = Nullable<{ [key: string] : string }>;

export interface UIInterface {
  /**
   * Returns custom properties from :root declaration
   */
  get getCustomProperties(): CustomProperties;

  /**
   * Returns color variables from custom properties
   */
  get getColors(): CustomProperties;

  /**
   * Returns font family from custom properties
   */
  get getFont(): string;
}