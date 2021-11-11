import { MapStructure, SystemBuilder } from '../builder/types';
import { DrawingContextProvider } from '../context/types';
import { ElementSource } from '../dom/types';
import { MAIN_BG_COLOR } from '../drawer/constants';
import { Drawer } from '../drawer/types';
import { MathGenerator } from '../generator/types';
import { GameSettings } from '../settings/types';
import { Game } from "./types";

export class Sapper implements Game {
    private select: Nullable<HTMLSelectElement> = null;
    private button: Nullable<HTMLElement> = null;
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
    ) {
        this.select = <HTMLSelectElement>elementSource.getElement('select-level');
        this.button = elementSource.getElement('start-game');
        this.gameContainer = elementSource.getElement('game-container');
        this.canvas = elementSource.getElement('canvas');
    }

    /**
     * Инициализируем данные игры
     * 
     * @returns {void}
     */
    public init(): void {
        this.elementSource.afterLoad((event: Event) => {
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
        this.changeVisibilityElements();
        this.makeInitialFill();
        this.contextProvider.listenCanvasClick(this.checkClick.bind(this));
    }

    /**
     * Меняет уровень после смены в селекте
     * 
     * @param {Event} event - DOM событие
     * 
     * @returns {void}
     */
    private changeLevel(event: Event): void {
        for (let key in this.settings.levels) {
            // @ts-ignore
            this.settings.levels[key].selected = false;
        }

        // @ts-ignore
        this.settings.levels[event.target.value].selected = true;
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
        const cellCoord: Cell = this.getCell(offsetX, offsetY);
        const cell = this.system.cells[cellCoord.y][cellCoord.x];
        
        if (cell.hasBomb) {
            // рисуем бомбу в указанной клетке на темном фоне
            // рисуем все остальные бомбы на синем фоне
            // стопорим игру

            //это пока временно, чтоб видно бомбы было
            this.drawer.drawNumber({
                x: Number(cellCoord.x) * this.cellSize.width,
                y: Number(cellCoord.y) * this.cellSize.height,
            }, this.cellSize, -1);
            cell.isOpen = true;
        } else if (cell.value !== 0) {
            // рисуем клетку с цифрой
            this.openNumberSquare(cell);
        } else {
            // рисуем пустую клетку
            // проходимся по соседям и рисуем клетки до того момента, пока не появится в клетке цифра
            this.openEmptySquare(cell);
            this.recursiveOpenArea(cell);
        }
    }

    private getCell(offsetX: number, offsetY: number): Cell {
        return {
            x: this.generator.getFloorNumber(offsetX / this.system.pixelsCountInCell),
            y: this.generator.getFloorNumber(offsetY / this.system.pixelsCountInCell),
        }
    }

    private recursiveOpenArea(cell: any) {
        for (let index in cell.area) {
            const systemCell = this.system.cells[cell.area[index].y][cell.area[index].x];
            
            if (!systemCell.isOpen && systemCell.value !== undefined) {
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

    private openEmptySquare(cell: any) {
        this.drawer.drawSquare({
            x: Number(cell.x) * this.cellSize.width,
            y: Number(cell.y) * this.cellSize.height,
        }, this.cellSize, MAIN_BG_COLOR);

        cell.isOpen = true;
    }

    private openNumberSquare(cell: any) {
        this.drawer.drawNumber({
            x: Number(cell.x) * this.cellSize.width,
            y: Number(cell.y) * this.cellSize.height,
        }, this.cellSize, cell.value);

        cell.isOpen = true;
    }
}