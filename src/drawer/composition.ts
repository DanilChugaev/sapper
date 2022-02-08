import { container } from '../composition';
import { Drawer } from './types';
import { CanvasDrawer } from './index';

container.registerSingleton<Drawer, CanvasDrawer>();