import { container } from './core';

// game register
import '../builder/di-register';
import '../drawer/di-register';
import '../settings/di-register';
import '../game/di-register';

// engine register
import './engine/ui-register';
import './engine/context-register';
import './engine/dom-register';
import './engine/math-register';
import './engine/source-register';
import './engine/storage-register';

container.registerSingleton<Window>(() => window);
container.registerSingleton<Math>(() => Math);
container.registerSingleton<typeof Image>(() => Image);
container.registerSingleton<Storage>(() => window.localStorage);
container.registerSingleton<ArrayConstructor>(() => Array);

export { container };

