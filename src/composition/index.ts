import { container } from './core';

import '../builder/composition';
import '../game/composition';

import '../engine/context/composition';
import '../engine/dom/composition';
import '../engine/drawer/composition';
import '../engine/generator/composition';
import '../engine/settings/composition';
import '../engine/source/composition';
import '../engine/storage/composition';

container.registerSingleton<Window>(() => window);
container.registerSingleton<Math>(() => Math);
container.registerSingleton<typeof Image>(() => Image);
container.registerSingleton<Storage>(() => window.localStorage);

export { container };