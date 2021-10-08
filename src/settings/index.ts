import { GameSettings } from "./types";
import { levels } from "./levels";

/** Основные настройки игры */
export const settings: GameSettings = {
    canvasSize: {
        width: 800,
        height: 800,
    },
    levels,
}