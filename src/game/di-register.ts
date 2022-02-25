import { container } from '../di-register';
import { Game } from './types';
import { Sapper } from './index';

container.registerSingleton<Game, Sapper>();