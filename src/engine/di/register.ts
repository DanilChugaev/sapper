import { container } from './core';

import '../context/di-register';
import '../dom/di-register';
import '../drawer/di-register';
import '../generator/di-register';
import '../settings/di-register';
import '../source/di-register';
import '../storage/di-register';

container.registerSingleton<Window>(() => window);
container.registerSingleton<Math>(() => Math);
container.registerSingleton<typeof Image>(() => Image);
container.registerSingleton<Storage>(() => window.localStorage);

export { container };

