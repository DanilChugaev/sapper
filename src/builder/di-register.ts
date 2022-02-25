import { container } from '../di-register';
import { SystemBuilder } from './types';
import { LevelBuilder } from './index';

container.registerSingleton<SystemBuilder, LevelBuilder>();