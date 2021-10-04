import { ElementSource } from '../dom/types';
import { Drawer } from '../drawer/types';
import { GameSettings } from '../settings/types';
import { Game } from "./types";

export class Sapper implements Game {
    private select: Nullable<HTMLSelectElement> = null;
    private button: Nullable<HTMLElement> = null;
    private gameContainer: Nullable<HTMLElement> = null;
    private canvas: Nullable<HTMLElement> = null;
    private levels: any;

    constructor(
        private settings: GameSettings,
        private drawer: Drawer,
        private elementSource: ElementSource,
    ) {
        this.select = <HTMLSelectElement>elementSource.getElement('select-level');
        this.button = elementSource.getElement('start-game');
        this.gameContainer = elementSource.getElement('game-container');
        this.canvas = elementSource.getElement('canvas');

        this.levels = this.settings.levels;
    }

    public init() {
        this.elementSource.afterLoad((event: Event) => {
            for (let key in this.levels) {
                const option = <HTMLOptionElement>this.elementSource.createElement('option');

                option.textContent = key;
                option.value = key;
                option.selected = this.levels[key].selected;

                this.select.appendChild(option);
            }

            this.select.addEventListener('change', this.changeLevel.bind(this), false);

            this.button.addEventListener('click', this.start.bind(this), false);
        });
    }

    private start() {
        // сделать билд уровня
        this.changeVisibilityElements();

        // console.log(this.settings);
        // this.drawer.drawLine({
        //     start: { x: 10, y: 10 },
        //     end: { x: 100, y: 100 },
        // }, {
        //     width: 3,
        // });
    }

    private changeLevel(event: Event): void {
        for (let key in this.levels) {
            this.levels[key].selected = false;
        }

        // @ts-ignore
        this.levels[event.target.value].selected = true;
    }

    private changeVisibilityElements(): void {
        this.button.style.display = 'none';
        this.select.style.display = 'none';
        this.gameContainer.style.display = 'flex';
        this.canvas.style.display = 'block';
    }
}