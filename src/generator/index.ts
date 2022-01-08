import { MathGenerator } from './types';

/** Math number generator */
export class Generator implements MathGenerator {
  /**
   * @param getRandom - returns random number
   * @param getFloor - returns floor number
   */
  constructor(
        private getRandom: () => number,
        private getFloor: (n: number) => number,
  ) {}

  /**
   * Returns a random integer in a specified range
   *
   * @param min - minimum number from the interval
   * @param max - maximum number from the interval
   */
  public getRandomArbitrary(min: number, max: number): number {
    return this.getFloorNumber(this.getRandom() * (max - min)) + min;
  }

  /**
   * Rounds a number to an integer
   *
   * @param n - original number
   */
  public getFloorNumber(n: number): number {
    return this.getFloor(n);
  }
}
