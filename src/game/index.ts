import { GameSettings } from '../settings/types'
import { Game } from "./types";

export class Sapper implements Game {
    constructor(
        private settings: GameSettings,
    ) {}

    public start() {
        console.log(this.settings);
    }
}