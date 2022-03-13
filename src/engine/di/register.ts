import { container } from './core';

import '../ui/di-register';
import '../context/di-register';
import '../dom/di-register';
import '../drawer/di-register';
import '../math/di-register';
import '../settings/di-register';
import '../source/di-register';
import '../storage/di-register';

container.registerSingleton<Window>(() => window);
container.registerSingleton<Math>(() => Math);
container.registerSingleton<typeof Image>(() => Image);
container.registerSingleton<Storage>(() => window.localStorage);
container.registerSingleton<ArrayConstructor>(() => Array);

export { container };

