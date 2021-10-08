import { SystemBuilder } from '../builder/types';
import { ElementSource } from '../dom/types';
import { Drawer } from '../drawer/types';
import { GameSettings } from '../settings/types';
import { Game } from "./types";

export class Sapper implements Game {
    private select: Nullable<HTMLSelectElement> = null;
    private button: Nullable<HTMLElement> = null;
    private gameContainer: Nullable<HTMLElement> = null;
    private canvas: Nullable<HTMLElement> = null;

    constructor(
        private settings: GameSettings,
        private drawer: Drawer,
        private elementSource: ElementSource,
        private builder: SystemBuilder,
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
        const system = this.builder.build(this.settings);
        this.changeVisibilityElements();

        // console.log(this.settings);
        // this.drawer.drawLine({
        //     start: { x: 10, y: 10 },
        //     end: { x: 100, y: 100 },
        // }, {
        //     width: 3,
        // });
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
}