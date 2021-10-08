import { RandomGenerator } from "./types";

export class Generator implements RandomGenerator {
    constructor(
        private getRandom: Function,
        private getFloor: Function,
    ) {}

    /**
     * Возвращает рандомное целое число в определенном промежутке
     * 
     * @param {number} min - минимальное число промежутка
     * @param {number} max - максимальное число промежутка
     * 
     * @returns {number}
     */
    public getRandomArbitrary(min: number, max: number): number {
        return this.getFloorNumber(this.getRandom() * (max - min)) + min;
    }

    /**
     * Округляет число до целого
     * 
     * @param {number} n - исходное число
     * 
     * @returns {number}
     */
    private getFloorNumber(n: number): number {
        return this.getFloor(n);
    }
}