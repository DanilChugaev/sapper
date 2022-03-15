import { container } from '../di/register';
import { DrawerInterface } from './types';
import { DrawerClass } from './index';

container.registerSingleton<DrawerInterface, DrawerClass>();