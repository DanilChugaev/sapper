import { MathInterface } from './types';

/** Math number generator */
export class MathClass implements MathInterface {
  /**
   * @param math - returns Math object
   */
  constructor(
      private math: Math,
  ) {}

  /**
   * Returns a random integer in a specified range
   *
   * @param min - minimum number from the interval
   * @param max - maximum number from the interval
   */
  public getRandomArbitrary(min: number, max: number): number {
    return this.getFloorNumber(this.math.random() * (max - min)) + min;
  }

  /**
   * Rounds a number to an integer
   *
   * @param n - original number
   */
  public getFloorNumber(n: number): number {
    return this.math.floor(n);
  }
}
