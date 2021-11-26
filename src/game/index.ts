import { MapStructure, SystemBuilder } from '../builder/types';
import { DrawingContextProvider } from '../context/types';
import { ElementSource } from '../dom/types';
import { INITIAL_FIELD_BG_COLOR, MAIN_BG_COLOR } from '../drawer/constants';
import { Drawer } from '../drawer/types';
import { MathGenerator } from '../generator/types';
import { GameSettings } from '../settings/types';
import { StorageProvider } from '../storage/types';
import { Game } from "./types";

export class Sapper implements Game {
    private select: Nullable<HTMLSelectElement> = null;
    private button: Nullable<HTMLElement> = null;
    private resultContainer: Nullable<HTMLElement> = null;
    private winContainer: Nullable<HTMLElement> = null;
    private leftBombContainer: Nullable<HTMLElement> = null;
    private gameContainer: Nullable<HTMLElement> = null;
    private canvas: Nullable<HTMLElement> = null;
    private system: MapStructure;
    private cellSize: Size;

    constructor(
        private settings: GameSettings,
        private contextProvider: DrawingContextProvider,
        private drawer: Drawer,
        private elementSource: ElementSource,
        private builder: SystemBuilder,
        private generator: MathGenerator,
        private storage: StorageProvider,
    ) {
        this.select = <HTMLSelectElement>elementSource.getElement('select-level');
        this.button = elementSource.getElement('start-game');
        this.gameContainer = elementSource.getElement('game-container');
        this.canvas = elementSource.getElement('canvas');
        this.resultContainer = elementSource.getElement('result-container');
        this.winContainer = elementSource.getElement('win-container');
        this.leftBombContainer = elementSource.getElement('left-bomb');
    }

    /**
     * Инициализируем данные игры
     * 
     * @returns {void}
     */
    public init(): void {
        this.elementSource.afterLoad((event: Event) => {
            // пробуем установить старый выбранный уровень
            const savedLevel = this.storage.get('level');

            if (savedLevel) {
                this.changeLevelInSettings(savedLevel);
            }
            
            for (let key in this.settings.levels) {
                const option = <HTMLOptionElement>this.elementSource.createElement('option');

                option.textContent = key;
                option.value = key;
                // @ts-ignore
                option.selected = this.settings.levels[key].selected;

                this.select.appendChild(option);
            }

            this.select.addEventListener('change', this.changeLevel.bind(this), false);

            this.button.addEventListener('click', this.start.bind(this), false);
        });
    }

    /**
     * Стартуем игру
     * 
     * @returns {void}
     */
    private start(): void {
        this.system = this.builder.build(this.settings);
        this.cellSize = {
            width: this.system.pixelsCountInCell,
            height: this.system.pixelsCountInCell,
        }
        this.leftBombContainer.textContent = this.system.bombLeft;
        this.changeVisibilityElements();
        this.makeInitialFill();
        this.contextProvider.listenCanvasClick(this.checkClick.bind(this));
        this.contextProvider.listenCanvasContextMenu(this.checkContextMenu.bind(this));
    }

    /**
     * Меняет уровень после смены в селекте
     * 
     * @param {Event} event - DOM событие
     * 
     * @returns {void}
     */
    private changeLevel(event: Event): void {
        // @ts-ignore
        this.changeLevelInSettings(event.target.value);
        this.storage.save({
            name: 'level',
            // @ts-ignore
            value: event.target.value,
        })
    }

    /**
     * Меняет уровень игры в настройках
     * 
     * @param {string} value - выбранный уровень
     * 
     * @returns {void}
     */
    private changeLevelInSettings(value: string) {
        for (let key in this.settings.levels) {
            // @ts-ignore
            this.settings.levels[key].selected = false;
        }

        // @ts-ignore
        this.settings.levels[value].selected = true;
    }

    /**
     * Меняет видимость игровых элементов на странице
     * 
     * @returns {void}
     */
    private changeVisibilityElements(): void {
        this.button.style.display = 'none';
        this.select.style.display = 'none';
        this.gameContainer.style.display = 'flex';
        this.canvas.style.display = 'block';
    }

    /**
     * Заполняет весь канвас по умолчанию
     * 
     * @returns {void}
     */
    private makeInitialFill() {
        const size: Size = this.settings.canvasSize;

        this.drawer.drawSquare({
            x: 0,
            y: 0,
        }, size);
    }

    private checkClick({ offsetX, offsetY }: MouseEvent): void {
        const cell = this.getCell(offsetX, offsetY);
        
        // чтобы нажать на клетку с флагом - его нужно сначала снять
        if (!cell.hasFlag) {
            if (cell.hasBomb) {
                this.openBombCell(cell); // рисуем бомбу в указанной клетке
                this.openAllBombs(); // рисуем все остальные бомбы
                this.stopGame(); // стопорим игру
            } else if (cell.value !== 0) {
                this.openNumberSquare(cell); // рисуем клетку с цифрой
            } else {
                this.openEmptySquare(cell); // рисуем пустую клетку
                this.recursiveOpenArea(cell); // проходимся по соседям и рисуем клетки до того момента, пока не появится в клетке цифра
            }
        }
    }

    private checkContextMenu(event: MouseEvent): void {
        event.preventDefault();

        const cell = this.getCell(event.offsetX, event.offsetY);

        if (!cell.isOpen) {
            if (!cell.hasFlag) {
                this.setFlag(cell);
            } else {
                this.removeFlag(cell);
            }
        }
    }

    private getCell(offsetX: number, offsetY: number): any {
        const x = this.generator.getFloorNumber(offsetX / this.system.pixelsCountInCell);
        const y = this.generator.getFloorNumber(offsetY / this.system.pixelsCountInCell);

        return this.system.cells[y][x];
    }

    private recursiveOpenArea(cell: any) {
        for (let index in cell.area) {
            const systemCell = this.system.cells[cell.area[index].y][cell.area[index].x];
            
            /**
             * из обработки пропускаем:
             *  - открытую ячейку
             *  - ячейку с флагом
             *  - ячейку с бомбой
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

    private openEmptySquare(cell: any): void {
        this.drawer.drawSquare({
            x: this.calcPixelWidth(cell.x),
            y: this.calcPixelHeight(cell.y),
        }, this.cellSize, MAIN_BG_COLOR);

        cell.isOpen = true;
    }

    private openNumberSquare(cell: any): void {
        this.drawer.drawNumber({
            x: this.calcPixelWidth(cell.x),
            y: this.calcPixelHeight(cell.y),
        }, this.cellSize, cell.value);

        cell.isOpen = true;
    }

    private openBombCell(cell: any): void {
        this.drawer.drawBomb({
            x: this.calcPixelWidth(cell.x),
            y: this.calcPixelHeight(cell.y),
        }, this.cellSize);

        cell.isOpen = true;
    }

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

    private setFlag(cell: any): void {
        this.drawer.drawFlag({
            x: this.calcPixelWidth(cell.x),
            y: this.calcPixelHeight(cell.y),
        }, this.cellSize);

        cell.hasFlag = true;

        this.system.bombLeft = this.system.bombLeft - 1;
        this.leftBombContainer.textContent = this.system.bombLeft;

        // if (this.system.bombLeft === 0 && allBombsAreCorrectSelected) {
        //     this.stopGame(true);
        // }
    }

    private removeFlag(cell: any): void {
        this.drawer.drawSquare({
            x: this.calcPixelWidth(cell.x),
            y: this.calcPixelHeight(cell.y),
        }, this.cellSize, INITIAL_FIELD_BG_COLOR, false);

        cell.hasFlag = false;

        this.system.bombLeft = this.system.bombLeft + 1;
        this.leftBombContainer.textContent = this.system.bombLeft;
    }

    private calcPixelWidth(x: string): number {
        return Number(x) * this.cellSize.width;
    }

    private calcPixelHeight(y: string): number {
        return Number(y) * this.cellSize.height;
    }

    private stopGame(isWin: boolean = false): void {
        // показываем кнопку рестарта
        this.resultContainer.style.display = 'flex';

        if (isWin) {
            // если выиграли, показываем поздравления
            this.winContainer.style.display = 'flex';
        }

        setTimeout(() => {
            this.resultContainer.classList.add('result-container--is-visible');
        }, 50);
    }
}