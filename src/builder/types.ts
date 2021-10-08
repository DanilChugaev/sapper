import { GameSettings } from "../settings/types";

export type MapStructure = any;

export interface SystemBuilder {
    /**
     * Билдит уровень
     * 
     * @param {GameSettings} settings - настройки игры
     * 
     * @returns {MapStructure}
     */
    build(settings: GameSettings): any;
}

export type AreaStructure = {
    0?: Cell,
    1?: Cell,
    2?: Cell,
    3?: Cell,
    4?: Cell,
    5?: Cell,
    6?: Cell,
    7?: Cell,
}