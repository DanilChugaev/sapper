import { container } from '../di/register';
import { GameInterface } from './types';
import { Sapper } from './index';

container.registerSingleton<GameInterface, Sapper>();