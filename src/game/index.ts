import { ElementSource } from '../dom/types';
import { Drawer } from '../drawer/types';
import { GameSettings } from '../settings/types';
import { Game } from "./types";

export class Sapper implements Game {
    private select: Nullable<HTMLSelectElement> = null;
    private button: Nullable<HTMLElement> = null;
    private levels: any;

    constructor(
        private settings: GameSettings,
        private drawer: Drawer,
        private elementSource: ElementSource,
    ) {
        this.select = <HTMLSelectElement>elementSource.getElement('select_level');
        this.button = elementSource.getElement('start_game');
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
        console.log(this.settings);
    }

    private changeLevel(event: Event) {
        for (let key in this.levels) {
            this.levels[key].selected = false;
        }

        // @ts-ignore
        this.levels[event.target.value].selected = true;
    }
}