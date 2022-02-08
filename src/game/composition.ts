import { container } from '../composition';
import { Game } from './types';
import { Sapper } from './index';

container.registerSingleton<Game, Sapper>();