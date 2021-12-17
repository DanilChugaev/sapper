import { Complexity, ComplexityList, GameSettings } from "../settings/types";
import { AreaStructure, MapStructure, SystemBuilder } from "./types";
import { AREA_STRUCTURE } from "./constants";
import { MathGenerator } from "../generator/types";

export class LevelBuilder implements SystemBuilder {
    private fieldSize: CellAmount;
    private bombCount: number;
    private canvasSize: PixelsAmount;

    constructor(
        private generator: MathGenerator,
    ) {}

    /**
     * Билдит уровень
     * 
     * @param {GameSettings} settings - настройки игры
     * 
     * @returns {MapStructure}
     */
    public build(settings: GameSettings): MapStructure {
        const { fieldSize, bombCount } = this.getSelectedLevel(settings.levels);

        this.fieldSize = fieldSize;
        this.bombCount = bombCount;
        this.canvasSize = settings.canvasSize;

        const map = this.generateMapStructure();

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
     * @returns {MapStructure}
     */
    private generateMapStructure(): MapStructure {
        const mapStructure: MapStructure = {
            pixelsCountInCell: this.canvasSize / this.fieldSize,
            bombCount: this.bombCount,
            bombLeft: this.bombCount,
            cells: {},
            bombPositions: [],
            fieldSize: this.fieldSize,
        };

        mapStructure.bombPositions = this.generateRandomBombPositions(this.fieldSize * this.fieldSize);

        for (let y = 0; y < this.fieldSize; y++) {
            for (let x = 0; x < this.fieldSize; x++) {
                const row: number = y;
                const cell: number = x;

                if (!mapStructure.cells[row]) {
                    mapStructure.cells[row] = {};
                }
                
                const hasBomb: boolean = mapStructure.bombPositions.includes(x + y * this.fieldSize);
                const area: AreaStructure = this.generateCellArea({ x, y });

                const cellStructure: any = {
                    y: row, 
                    x: cell,
                    area,
                }

                if (hasBomb) {
                    cellStructure.hasBomb = hasBomb;
                } else {
                    cellStructure.value = this.calcBombsAroundCells(area, mapStructure.bombPositions);
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
    
        // 8 - количество ячеек вокруг центральной
        for (let index = 0; index < 8; index++) {
            /** Проверяем, не выходит ли ячейка за левую и верхнюю границы поля */
            // @ts-ignore
            if (x + AREA_STRUCTURE[index].x < 0 || y + AREA_STRUCTURE[index].y < 0) {
                continue;
            }

            /** Проверяем, не выходит ли ячейка за правую и нижнюю границы поля */
            // @ts-ignore
            if (x + AREA_STRUCTURE[index].x >= this.fieldSize || y + AREA_STRUCTURE[index].y >= this.fieldSize) {
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
     * @param {number} cellsCount - количество ячеек на поле
     * 
     * @returns {number[]}
     */
    private generateRandomBombPositions(cellsCount: number): number[] {
        const bombPositions: number[] = [];

        for (let index = 0; index < this.bombCount; index++) {
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
     * 
     * @returns {number}
     */
    private calcBombsAroundCells(area: AreaStructure, bombPositions: number[]): number {
        let result: number = 0;

        for (let key in area) {
            // @ts-ignore
            const cell = area[key];

            if (bombPositions.includes(cell.x + cell.y * this.fieldSize)) {
                result += 1;
            }
        }

        return result;
    }
}