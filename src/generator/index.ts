import { MathGenerator } from './types';

/** Math number generator */
export class Generator implements MathGenerator {
  /**
   * Returns a random integer in a specified range
   *
   * @param min - minimum number from the interval
   * @param max - maximum number from the interval
   */
  public getRandomArbitrary(min: number, max: number): number {
    return this.getFloorNumber(Math.random() * (max - min)) + min;
  }

  /**
   * Rounds a number to an integer
   *
   * @param n - original number
   */
  public getFloorNumber(n: number): number {
    return Math.floor(n);
  }
}
