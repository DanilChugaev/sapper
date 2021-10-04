import { CanvasContextProvider } from "./context/index";
import { DomSource } from "./dom/index";
import { CanvasDrawer } from "./drawer/index";
import { Sapper } from "./game/index";
import { settings } from "./settings/index";

const pixelRatioSource = {
    devicePixelRatio: 1,
}

const domSource = new DomSource(window);
const contextProvider = new CanvasContextProvider(domSource, pixelRatioSource, settings);
const drawer = new CanvasDrawer(contextProvider);
const sapper = new Sapper(settings, drawer, domSource);

sapper.init();