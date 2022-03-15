import { Complexity, ComplexityList, GameSettings } from '../settings/types';
import { AreaStructure, MapStructure, BuilderInterface } from './types';
import { AREA_STRUCTURE } from './constants';
import { MathInterface } from '../engine/math/types';

/** Class responsible for creating levels based on levels settings */
export class BuilderClass implements BuilderInterface {
    /** Size of the field in cells */
    private fieldSize: CellAmount;

    /** Size of the field in pixels */
    private canvasSize: PixelsAmount;

    /** Number of level bombs */
    private bombCount: number;

    /**
     * @param mathInstance - math number generator
     */
    constructor(
        private mathInstance: MathInterface,
    ) {}

    /**
     * Build level
     *
     * @param settings - basic game settings
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
     * Returns the selected difficulty level from the list of levels from the settings
     *
     * @param levels - list of possible levels of difficulty of the game
     */
    private getSelectedLevel(levels: ComplexityList): Complexity {
      let selectedLevel: Complexity;

      for (const key in levels) {
        // @ts-ignore
        if (levels[key].selected) {
          // @ts-ignore
          selectedLevel = levels[key];
        }
      }

      return selectedLevel;
    }

    /** Generates the field structure for the selected difficulty level */
    private generateMapStructure(): MapStructure {
      const mapStructure: MapStructure = {
        pixelsCountInCell: this.canvasSize / this.fieldSize,
        bombCount: this.bombCount,
        bombLeft: this.bombCount,
        usedCells: 0,
        cells: {},
        bombPositions: [],
        fieldSize: this.fieldSize,
      };

      mapStructure.bombPositions = this.generateRandomBombPositions(this.fieldSize * this.fieldSize);

      // traversal of arrays goes from left to right and from top to bottom
      for (let y = 0; y < this.fieldSize; y++) {
        for (let x = 0; x < this.fieldSize; x++) {
          const row: number = y;
          const cell: number = x;

          if (!mapStructure.cells[row]) {
            mapStructure.cells[row] = {};
          }

          const hasBomb: boolean = mapStructure.bombPositions.includes(x + y * this.fieldSize);
          const area: AreaStructure = this.generateCellArea({ x, y });

          const cellStructure: Cell = {
            y: row,
            x: cell,
            area,
          };

          if (hasBomb) {
            cellStructure.hasBomb = hasBomb;
          } else {
            cellStructure.value = this.calcBombsAroundCells(area, mapStructure.bombPositions);
          }

          mapStructure.cells[row][cell] = cellStructure;
        }
      }

      return mapStructure;
    }

    /**
     * Generates a region of cells with their coordinates around the selected cell based on its coordinates
     *
     * @param cell - game board cell
     * @param cell.x - the x coordinate on the playing field
     * @param cell.y - the y coordinate on the playing field
     */
    private generateCellArea({ x, y }: Cell): AreaStructure {
      const area: AreaStructure = {};

      // 8 - the number of cells around the central
      for (let index = 0; index < 8; index++) {
        /** Checking if the cell goes beyond the left and top borders of the field */
        // @ts-ignore
        if (x + AREA_STRUCTURE[index].x < 0 || y + AREA_STRUCTURE[index].y < 0) {
          continue;
        }

        /** Checking if the cell goes beyond the right and bottom borders of the field */
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
        };
      }

      return area;
    }

    /**
     * Generates random positions for placing bombs on the field
     *
     * @param cellsCount - number of cells of the playing field
     */
    private generateRandomBombPositions(cellsCount: CellAmount): number[] {
      const bombPositions: BombPositions = [];

      for (let index = 0; index < this.bombCount; index++) {
        let randomPosition: number = this.mathInstance.getRandomArbitrary(1, cellsCount);

        // if the generated position is already in the list, we generate it again
        while (bombPositions.includes(randomPosition)) {
          randomPosition = this.mathInstance.getRandomArbitrary(1, cellsCount);
        }

        bombPositions.push(randomPosition);
      }

      return bombPositions.sort((a, b) => a - b);
    }

    /**
     * Counts the number of bombs around the cell
     *
     * @param area - neighboring cells relative to the center cell
     * @param bombPositions - positions of bombs on the field
     */
    private calcBombsAroundCells(area: AreaStructure, bombPositions: BombPositions): number {
      let result = 0;

      for (const key in area) {
        // @ts-ignore
        const cell = area[key];

        if (bombPositions.includes(cell.x + cell.y * this.fieldSize)) {
          result += 1;
        }
      }

      return result;
    }
}
