import { container } from './core';

import '../builder/composition';
import '../context/composition';
import '../dom/composition';
import '../drawer/composition';
import '../game/composition';
import '../generator/composition';
import '../settings/composition';
import '../source/composition';
import '../storage/composition';

container.registerSingleton<Window>(() => window);
container.registerSingleton<Math>(() => Math);
container.registerSingleton<typeof Image>(() => Image);
container.registerSingleton<Storage>(() => window.localStorage);

export { container };