import { GameSettings } from "./types";
import { levels } from "./levels";

/** Основные настройки игры */
export const settings: GameSettings = {
    canvasSize: 800,
    devicePixelRatio: 1,
    levels,
}