import { container } from '../composition';
import { SystemBuilder } from './types';
import { LevelBuilder } from './index';

container.registerSingleton<SystemBuilder, LevelBuilder>();