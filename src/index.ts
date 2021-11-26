import { LevelBuilder } from "./builder/index";
import { CanvasContextProvider } from "./context/index";
import { DomSource } from "./dom/index";
import { CanvasDrawer } from "./drawer/index";
import { Sapper } from "./game/index";
import { Generator } from "./generator/index";
import { settings } from "./settings/index";
import { FileSource } from "./source/index";

import "./index.scss";
import { DataStorage } from "./storage/index";

const pixelRatioSource = {
    devicePixelRatio: 1,
}

const storage = new DataStorage(window.localStorage);
const fileProvider = new FileSource();
const domSource = new DomSource(window);
const contextProvider = new CanvasContextProvider(domSource, pixelRatioSource, settings);
const drawer = new CanvasDrawer(contextProvider, fileProvider);
const generator = new Generator(Math.random, Math.floor);
const builder = new LevelBuilder(generator);
const sapper = new Sapper(settings, contextProvider, drawer, domSource, builder, generator, storage);

sapper.init();