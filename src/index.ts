// настройки
    // тип
    // дефолтные значения
// инициализация поля
// работа с канвас
import { Sapper } from "./game/index";
import { settings } from "./settings/index";

const sapper = new Sapper(settings);
sapper.start();