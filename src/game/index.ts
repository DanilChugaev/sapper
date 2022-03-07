import { MapStructure, BuilderInterface } from '../builder/types';
import { ContextInterface } from '../engine/context/types';
import { DomInterface } from '../engine/dom/types';
import { INITIAL_FIELD_BG_COLOR, MAIN_BG_COLOR } from '../engine/drawer/constants';
import { DrawerInterface } from '../engine/drawer/types';
import { MathInterface } from '../engine/math/types';
import { GameSettings } from '../engine/settings/types';
import { StorageInterface } from '../engine/storage/types';
import { GameInterface } from './types';

/** The main class of the game */
export class Sapper implements GameInterface {
    /** HTML select for choice of difficulty level */
    private select: Nullable<HTMLSelectElement> = null;

    /** HTML button for start game */
    private startGameButton: Nullable<HTMLElement> = null;

     /** Container for best level time */
     private levelTime: Nullable<HTMLElement> = null;

    /** To display best level time before the game */
    private bestLevelTime: Nullable<HTMLElement> = null;

    /** Element on which the game will be drawn */
    private canvas: Nullable<HTMLElement> = null;

    /** Container for fields and other containers */
    private gameContainer: Nullable<HTMLElement> = null;

    /** To display the results of the game */
    private resultContainer: Nullable<HTMLElement> = null;

    /** Container for current time and best time of the game */
    private winContainer: Nullable<HTMLElement> = null;

    /** To display the remaining number of bombs */
    private leftBombContainer: Nullable<HTMLElement> = null;

    /** to display the time since the start of the game */
    private timerContainer: Nullable<HTMLElement> = null;

    /** Container for current time of the game in win container */
    private currentTimeContainer: Nullable<HTMLElement> = null;

    /** Container for best time of the game in win container */
    private bestTimeContainer: Nullable<HTMLElement> = null;

    /** Structure of the field of the selected level of difficulty */
    private system: MapStructure;

    /** Cell size in pixels */
    private cellPixelsSize: PixelsAmount;

    /** Timer for counting time */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private timerInterval: any; // todo: fix type

    /** Number of correctly allocated bombs */
    private countCorrectlySelectedBombs = 0;

    /**
     * @param settings - basic game settings
     * @param contextInstance - provides the context of the canvas
     * @param drawerInstance - for painting on canvas
     * @param domInstance - allows interact with the DOM tree
     * @param builderInstance - responsible for creating levels
     * @param mathInstance - math number generator
     * @param storageInstance - long-term storage of game data
     */
    constructor(
        private settings: GameSettings,
        private contextInstance: ContextInterface,
        private drawerInstance: DrawerInterface,
        private domInstance: DomInterface,
        private builderInstance: BuilderInterface,
        private mathInstance: MathInterface,
        private storageInstance: StorageInterface,
    ) {
      this.select = <HTMLSelectElement>domInstance.getElement('select-level');
      this.startGameButton = domInstance.getElement('start-game');
      this.levelTime = domInstance.getElement('level-time');
      this.bestLevelTime = domInstance.getElement('best-level-time');
      this.canvas = domInstance.getElement('canvas');
      this.gameContainer = domInstance.getElement('game-container');
      this.resultContainer = domInstance.getElement('result-container');
      this.winContainer = domInstance.getElement('win-container');
      this.leftBombContainer = domInstance.getElement('left-bomb');
      this.timerContainer = domInstance.getElement('timer');
      this.currentTimeContainer = domInstance.getElement('current-time-container');
      this.bestTimeContainer = domInstance.getElement('best-time-container');
    }

    /** Initializes game engine after the DOM has loaded */
    public init(): void {
      this.domInstance.afterLoad(() => {
        const selectedLevel = this.storageInstance.get('level') || 'easy';

        /** if we have previously selected the level, then set it again */
        this.changeLevelInSettings(selectedLevel);

        for (const key in this.settings.levels) {
          const option = <HTMLOptionElement> this.domInstance.createElement('option');

          option.textContent = key;
          option.value = key;
          // @ts-ignore
          option.selected = this.settings.levels[key].selected;

          /** substitute the selection options into the select from the settings */
          this.select.appendChild(option);
        }

        this.select.addEventListener('change', this.changeLevel.bind(this), false);

        this.startGameButton.addEventListener('click', this.start.bind(this), false);
      });
    }

    /** Generate level and start the game */
    private start(): void {
      this.system = this.builderInstance.build(this.settings);
      this.cellPixelsSize = this.system.pixelsCountInCell;

      // display bombs left and timer above the field
      this.leftBombContainer.textContent = this.system.bombLeft.toString();
      this.timerContainer.textContent = '0';

      this.changeVisibilityElements();
      this.makeInitialFill();
      this.startTimer();

      this.contextInstance.listenCanvasClick(this.checkClick.bind(this));
      this.contextInstance.listenCanvasContextMenu(this.checkRightButtonClick.bind(this));
    }

    /** Start timer for counting the level time (in seconds) */
    private startTimer(): void {
      let seconds = 0;

      // display the current time above the field
      this.timerContainer.textContent = String(seconds++);

      // update the timer once per second
      this.timerInterval = setInterval(() => {
        this.timerContainer.textContent = String(seconds++);
      }, 1000);
    }

    /**
     * Stop timer and save the level time count
     *
     * @param isWin - true, if the game ends with a win
     */
    private stopTimer(isWin: boolean): void {
      clearInterval(this.timerInterval);

      if (isWin) {
        const currentTime = this.timerContainer.textContent;
        const currentLevel = this.storageInstance.get('level');
        const bestTimeStorageName = `best-time-${currentLevel}`;
        const bestTime = this.storageInstance.get(bestTimeStorageName);
        let time = '';

        // display current time on the finish screen
        this.currentTimeContainer.textContent = currentTime;

        if (bestTime && Number(bestTime) < Number(currentTime)) {
          time = bestTime;
        } else {
          time = currentTime;
        }

        this.storageInstance.save({
          name: bestTimeStorageName,
          value: time,
        });

        // display best time on the finish screen
        this.bestTimeContainer.textContent = time;
      }
    }

    /**
     * Changes the level after changing the value in the select
     *
     *  @param event - DOM event
     */
    private changeLevel(event: Event): void {
      // @ts-ignore
      this.changeLevelInSettings(event.target.value);

      this.storageInstance.save({
        name: 'level',
        // @ts-ignore
        value: event.target.value,
      });
    }

    /**
     * Changes the level of the game in the settings
     *
     * @param selectedLevel - nama of selected level
     */
    private changeLevelInSettings(selectedLevel: string): void {
      const bestTime = this.storageInstance.get(`best-time-${selectedLevel}`);

      // if the level was passed earlier, then display its best time on the start screen
      if (bestTime) {
        this.levelTime.style.display = 'block';
        this.bestLevelTime.textContent = bestTime;
      } else {
        this.levelTime.style.display = 'none';
      }

      for (const key in this.settings.levels) {
        // @ts-ignore
        this.settings.levels[key].selected = false;
      }

      // @ts-ignore
      this.settings.levels[selectedLevel].selected = true;
    }

    /** Changes visibility of game elements on the page after start of the game */
    private changeVisibilityElements(): void {
      this.startGameButton.style.display = 'none';
      this.select.style.display = 'none';
      this.levelTime.style.display = 'none';
      this.gameContainer.style.display = 'flex';
      this.canvas.style.display = 'block';
    }

    /** Fills the entire canvas by default with the default color */
    private makeInitialFill(): void {
      const size: PixelsAmount = this.settings.canvasSize;

      this.drawerInstance.drawSquare({
        x: 0,
        y: 0,
      }, size, INITIAL_FIELD_BG_COLOR);
    }

    /**
     * Track the click on the canvas
     *
     * @param mouseEvent - events that occur due to the user interacting with a mouse
     * @param mouseEvent.offsetX - offset of the mouse cursor along the X axis from the edge of the canvas
     * @param mouseEvent.offsetY - offset of the mouse cursor along the Y axis from the edge of the canvas
     */
    private checkClick({ offsetX, offsetY }: MouseEvent): void {
      const cell = this.getCell(offsetX, offsetY);

      // to click on the cell with the flag - first you need to remove it
      if (!cell.hasFlag) {
        if (cell.hasBomb) {
          this.openBombCell(cell); // draw a bomb in the specified cell
          this.openAllBombs(); // draw all the other bombs
          this.stopGame(); // stop the game
        } else if (cell.value !== 0) {
          this.openNumberSquare(cell); // draw a cell with a number
        } else {
          this.openEmptySquare(cell); // draw an empty cell
          this.recursiveOpenArea(cell); // go through the neighbors and draw the cells until the number appears in the cell
        }

        this.checkIfGameShouldStopped();
      }
    }

    /**
     * Track the right mouse button click on the canvas
     *
     * @param mouseEvent - events that occur due to the user interacting with a mouse
     */
    private checkRightButtonClick(mouseEvent: MouseEvent): void {
      // prevent the context menu from opening
      mouseEvent.preventDefault();

      const cell = this.getCell(mouseEvent.offsetX, mouseEvent.offsetY);

      if (!cell.isOpen) {
        if (!cell.hasFlag) {
          this.setFlag(cell);
        } else {
          this.removeFlag(cell);
        }
      }
    }

    /**
     * Returns the cell of the generated level
     *
     * @param offsetX - offset of the mouse cursor along the X axis from the edge of the canvas
     * @param offsetY - offset of the mouse cursor along the Y axis from the edge of the canvas
     */
    private getCell(offsetX: number, offsetY: number): Cell {
      const x = this.mathInstance.getFloorNumber(offsetX / this.system.pixelsCountInCell);
      const y = this.mathInstance.getFloorNumber(offsetY / this.system.pixelsCountInCell);

      return this.system.cells[y][x];
    }

    /**
     * Open area of cells around a given cell
     *
     * @param cell - game board cell
     */
    private recursiveOpenArea(cell: Cell): void {
      for (const index in cell.area) {
        const systemCell = this.system.cells[cell.area[index].y][cell.area[index].x];

        /**
         * skip from processing:
         *  - open cell
         *  - flag cell
         *  - bomb cell
         */
        if (!systemCell.isOpen && !systemCell.hasFlag && !systemCell.hasBomb) {
          if (systemCell.value === 0) {
            this.openEmptySquare(systemCell);

            this.recursiveOpenArea(systemCell);
          } else {
            this.openNumberSquare(systemCell);

            continue;
          }
        } else {
          continue;
        }
      }
    }

    /**
     * Open empty cell
     *
     * @param cell - game board cell
     */
    private openEmptySquare(cell: Cell): void {
      this.drawerInstance.drawSquare({
        x: this.calcPixelCoord(cell.x),
        y: this.calcPixelCoord(cell.y),
      }, this.cellPixelsSize, MAIN_BG_COLOR);

      cell.isOpen = true;
      this.system.usedCells++;
    }

    /**
     * Open cell with number
     *
     * @param cell - game board cell
     */
    private openNumberSquare(cell: Cell): void {
      this.drawerInstance.drawNumber({
        x: this.calcPixelCoord(cell.x),
        y: this.calcPixelCoord(cell.y),
      }, this.cellPixelsSize, cell.value);

      cell.isOpen = true;
      this.system.usedCells++;
    }

    /**
     * Open cell with bomb
     *
     * @param cell - game board cell
     */
    private openBombCell(cell: Cell): void {
      this.drawerInstance.drawBomb({
        x: this.calcPixelCoord(cell.x),
        y: this.calcPixelCoord(cell.y),
      }, this.cellPixelsSize);

      cell.isOpen = true;
      this.system.usedCells++;
    }

    /** Open all bombs on the field */
    private openAllBombs(): void {
      const { bombPositions, cells, fieldSize } = this.system;

      for (let y = 0; y < Object.keys(cells).length; y++) {
        for (let x = 0; x < Object.keys(cells[y]).length; x++) {
          if (bombPositions.includes(x + y * fieldSize)) {
            this.openBombCell(cells[y][x]);
          }
        }
      }
    }

    /**
     * Set a flag in a cell and count the correctly selected bombs
     *
     * @param cell - game board cell
     */
    private setFlag(cell: Cell): void {
      this.drawerInstance.drawFlag({
        x: this.calcPixelCoord(cell.x),
        y: this.calcPixelCoord(cell.y),
      }, this.cellPixelsSize);

      cell.hasFlag = true;
      this.system.usedCells++;

      this.system.bombLeft = this.system.bombLeft - 1;
      // displaying the number of remaining bombs over the field
      this.leftBombContainer.textContent = this.system.bombLeft.toString();

      if (cell.hasBomb) {
        this.countCorrectlySelectedBombs++;
      }

      this.checkIfGameShouldStopped();
    }

    /**
     * Remove flag from cell
     *
     * @param cell - game board cell
     */
    private removeFlag(cell: Cell): void {
      this.drawerInstance.drawSquare({
        x: this.calcPixelCoord(cell.x),
        y: this.calcPixelCoord(cell.y),
      }, this.cellPixelsSize, INITIAL_FIELD_BG_COLOR, false);

      cell.hasFlag = false;
      this.system.usedCells--;

      this.system.bombLeft = this.system.bombLeft + 1;
      // displaying the number of remaining bombs over the field
      this.leftBombContainer.textContent = this.system.bombLeft.toString();

      if (cell.hasBomb) {
        this.countCorrectlySelectedBombs--;
      }
    }

    /**
     * Calculate the initial coordinates of the cell in pixels
     *
     * @param coord - coordinate on the playing field
     */
    private calcPixelCoord(coord: FieldCoordinate): PixelsAmount {
      return Number(coord) * this.cellPixelsSize;
    }

    /**
     * Stop game
     *
     * @param isWin - true, if the game ends with a win
     */
    private stopGame(isWin = false): void {
      this.stopTimer(isWin);

      // show the restart button
      this.resultContainer.style.display = 'flex';

      if (isWin) {
        // if you won, show congratulations
        this.winContainer.style.display = 'flex';
      }

      // this is to animate the background appearance
      setTimeout(() => {
        this.resultContainer.classList.add('result-container--is-visible');
      }, 50);
    }

    /**
     * Check the conditions for stopping the game
     */
    private checkIfGameShouldStopped(): void {
      // has zero bomb
      if (!(this.system.bombLeft === 0)) {
        return;
      }

      // all bombs are correctly selected
      if (!(this.system.bombCount === this.countCorrectlySelectedBombs)) {
        return;
      }

      // all cells are opened
      if (!(this.system.usedCells === (this.system.fieldSize * this.system.fieldSize))) {
        return;
      }

      // stop the game with a win if all the bombs have run out and are marked with flags correctly
      this.stopGame(true);
    }
}
