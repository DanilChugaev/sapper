import { ElementSource } from '../dom/types';
import { Drawer } from '../drawer/types';
import { GameSettings } from '../settings/types';
import { Game } from "./types";

export class Sapper implements Game {
    private select: Nullable<HTMLSelectElement> = null;
    private button: Nullable<HTMLElement> = null;

    constructor(
        private settings: GameSettings,
        private drawer: Drawer,
        private elementSource: ElementSource,
    ) {
        this.select = <HTMLSelectElement>elementSource.getElement('select_level');
        this.button = elementSource.getElement('start_game');
    }

    public init() {
        this.elementSource.afterLoad((event: Event) => {
            const levels = this.settings.levels;

            for (let key in levels) {
                const option = <HTMLSelectElement>this.elementSource.createElement('option');

                option.textContent = key;
                option.value = key;
                this.select.appendChild(option);
            }
        });
    }

    public start() {
        console.log(this.settings);
    }
}