export interface MathGenerator {
    /**
     * Возвращает рандомное целое число в определенном промежутке
     * 
     * @param {number} min - минимальное число промежутка
     * @param {number} max - максимальное число промежутка
     * 
     * @returns {number}
     */
    getRandomArbitrary(min: number, max: number): number;
    getFloorNumber(n: number): number;
}