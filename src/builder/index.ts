import { Complexity, ComplexityList, GameSettings } from "../settings/types";
import { AreaStructure, MapStructure, SystemBuilder } from "./types";
import { AREA_STRUCTURE } from "./constants";
import { RandomGenerator } from "../generator/types";

export class LevelBuilder implements SystemBuilder {
    constructor(
        private generator: RandomGenerator,
    ) {}

    /**
     * Билдит уровень
     * 
     * @param {GameSettings} settings - настройки игры
     * 
     * @returns {MapStructure}
     */
    public build(settings: GameSettings): MapStructure {
        const selectedLevel = this.getSelectedLevel(settings.levels);
        const map = this.generateMapStructure(settings.canvasSize, selectedLevel);

        return map;
    }

    /**
     * Возвращает выбранный уровень сложности из списка
     * 
     * @param {ComplexityList} levels - список уровней сложности
     * 
     * @returns {Complexity}
     */
    private getSelectedLevel(levels: ComplexityList): Complexity {
        let selectedLevel: Complexity;

        for (let key in levels) {
            // @ts-ignore
            if (levels[key].selected) {
                // @ts-ignore
                selectedLevel = levels[key];
            }
        }

        return selectedLevel;
    }

    /**
     * Генерирует структуру поля для выбранного уровня сложности
     * 
     * @param {Size} canvasSize - размер канваса в пикселях
     * @param {number} fieldSize - размер игрового поля в клетках
     * @param {number} bombCount - количество бомб на игровом поле
     * 
     * @returns {MapStructure}
     */
    private generateMapStructure(canvasSize: Size, { fieldSize, bombCount }: Complexity): MapStructure {
        const mapStructure: MapStructure = {
            pixelsCountInCell: canvasSize.width / fieldSize,
            bombCount,
            cells: {},
        };

        const bombPositions: number[] = this.generateRandomBombPositions(bombCount, fieldSize * fieldSize);

        for (let y = 0; y < fieldSize; y++) {
            for (let x = 0; x < fieldSize; x++) {
                const row: number = y;
                const cell: number = x;

                if (!mapStructure.cells[row]) {
                    mapStructure.cells[row] = {};
                }
                
                const hasBomb: boolean = bombPositions.includes(x + y * fieldSize);
                const area: AreaStructure = this.generateCellArea({ x, y });

                const cellStructure: any = {
                    y: row, 
                    x: cell,
                    area,
                }

                if (hasBomb) {
                    cellStructure.hasBomb = hasBomb;
                } else {
                    cellStructure.value = this.calcBombsAroundCells(area, bombPositions, fieldSize);
                }

                mapStructure.cells[row][cell] = cellStructure;
            }
        }

        console.log(mapStructure);

        return mapStructure;
    }

    /**
     * Генерирует область ячеек с их координатами вокруг выбранной ячейки на основе ее координат
     * 
     * @param {number} x - координата 'x' ячейки
     * @param {number} y - координата 'y' ячейки
     * 
     * @returns {AreaStructure}
     */
    private generateCellArea({ x, y }: Cell): AreaStructure {
        const area: AreaStructure = {};

        for (let index = 0; index < 8; index++) {
            /** Проверяем, не выходит ли ячейка за границу поля */
            // @ts-ignore
            if (x + AREA_STRUCTURE[index].x < 0 || y + AREA_STRUCTURE[index].y < 0) {
                continue;
            }

            // @ts-ignore
            area[index] = {
                // @ts-ignore
                x: x + AREA_STRUCTURE[index].x,
                // @ts-ignore
                y: y + AREA_STRUCTURE[index].y,
            }
        }

        return area;
    }

    /**
     * Генерирует рандомные позиции для расположения бомб на поле
     * 
     * @param {number} bombCount - количество бомб
     * @param {number} cellsCount - количество ячеек на поле
     * 
     * @returns {number[]}
     */
    private generateRandomBombPositions(bombCount: number, cellsCount: number): number[] {
        const bombPositions: number[] = [];

        for (let index = 0; index < bombCount; index++) {
            let randomPosition: number = this.generator.getRandomArbitrary(1, cellsCount);

            while (bombPositions.includes(randomPosition)) {
                randomPosition = this.generator.getRandomArbitrary(1, cellsCount);
            }

            bombPositions.push(randomPosition);
        }

        return bombPositions.sort((a, b) => a - b);
    }

    /**
     * Считает количество бомб вокруг ячейки
     * 
     * @param {AreaStructure} area
     * @param {number[]} bombPositions
     * @param {number} fieldSize
     * 
     * @returns {number}
     */
    private calcBombsAroundCells(area: AreaStructure, bombPositions: number[], fieldSize: number): number {
        let result: number = 0;

        for (let key in area) {
            // @ts-ignore
            const cell = area[key];

            if (bombPositions.includes(cell.x + cell.y * fieldSize)) {
                result += 1;
            }
        }

        return result;
    }
}