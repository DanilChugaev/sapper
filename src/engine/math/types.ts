/** Math number generator */
export interface MathInterface {
    /**
     * Returns a random integer in a specified range
     *
     * @param min - minimum number from the interval
     * @param max - maximum number from the interval
     */
    getRandomArbitrary(min: number, max: number): number;

    /**
     * Rounds a number to an integer
     *
     * @param n - original number
     */
    getFloorNumber(n: number): number;
}
