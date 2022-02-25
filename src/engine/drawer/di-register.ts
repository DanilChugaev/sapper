import { container } from '../../di-register';
import { Drawer } from './types';
import { CanvasDrawer } from './index';

container.registerSingleton<Drawer, CanvasDrawer>();